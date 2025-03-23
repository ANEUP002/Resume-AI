const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

function tailorResume(personalInfo, jobDescription) {
  // Extract keywords from job description
  const jobKeywords = jobDescription.toLowerCase().split(/\W+/);
  
  // Organize skills based on job relevance
  let skills = personalInfo.skills.split('\n');
  skills.sort((a, b) => {
    const aRelevance = jobKeywords.filter(keyword => 
      a.toLowerCase().includes(keyword)).length;
    const bRelevance = jobKeywords.filter(keyword => 
      b.toLowerCase().includes(keyword)).length;
    return bRelevance - aRelevance;
  });

  // Organize experience based on job relevance
  let experiences = personalInfo.experience.split('\n\n');
  experiences.sort((a, b) => {
    const aRelevance = jobKeywords.filter(keyword => 
      a.toLowerCase().includes(keyword)).length;
    const bRelevance = jobKeywords.filter(keyword => 
      b.toLowerCase().includes(keyword)).length;
    return bRelevance - aRelevance;
  });

  return {
    ...personalInfo,
    skills: skills.join('\n'),
    experience: experiences.join('\n\n')
  };
}

async function generateResume(personalInfo, jobDescription) {
  try {
    // Tailor the resume content
    const tailoredContent = tailorResume(personalInfo, jobDescription);
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `resume_${Date.now()}.pdf`;
    const outputPath = path.join(uploadsDir, fileName);

    // Create PDF document
    const doc = new PDFDocument({
      margin: 50,
      size: 'A4'
    });

    // Pipe PDF to file
    doc.pipe(fs.createWriteStream(outputPath));

    // Add content to PDF with improved styling
    // Header
    doc.fontSize(24)
       .font('Helvetica-Bold')
       .text('PROFESSIONAL RESUME', { align: 'center' })
       .moveDown();

    // Personal Information
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .text(tailoredContent.name, { align: 'left' })
       .fontSize(10)
       .font('Helvetica')
       .text(`Email: ${tailoredContent.email}`)
       .text(`Phone: ${tailoredContent.phone}`)
       .moveDown();

    // Professional Summary
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('PROFESSIONAL SUMMARY', { underline: true })
       .moveDown(0.5)
       .font('Helvetica')
       .fontSize(10);
    
    // Generate a professional summary based on experience and job description
    const summary = `Experienced professional with expertise in ${
      tailoredContent.skills.split('\n').slice(0, 3).join(', ')
    }. Demonstrated success in ${
      tailoredContent.experience.split('\n')[0].substring(0, 100)
    }...`;
    
    doc.text(summary)
       .moveDown();

    // Experience
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('PROFESSIONAL EXPERIENCE', { underline: true })
       .moveDown(0.5)
       .fontSize(10)
       .font('Helvetica');
    
    tailoredContent.experience.split('\n\n').forEach(exp => {
      doc.text(exp.trim())
         .moveDown();
    });

    // Skills
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('RELEVANT SKILLS', { underline: true })
       .moveDown(0.5)
       .fontSize(10)
       .font('Helvetica');
    
    tailoredContent.skills.split('\n').forEach(skill => {
      doc.text(`• ${skill.trim()}`);
    });
    doc.moveDown();

    // Education
    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('EDUCATION', { underline: true })
       .moveDown(0.5)
       .fontSize(10)
       .font('Helvetica');
    
    tailoredContent.education.split('\n').forEach(edu => {
      doc.text(edu.trim())
         .moveDown(0.5);
    });

    // Finalize PDF
    doc.end();

    return new Promise((resolve, reject) => {
      doc.on('end', () => {
        resolve({ success: true, path: `uploads/${fileName}` });
      });

      doc.on('error', (error) => {
        console.error('PDF Generation Error:', error);
        reject(new Error('Failed to generate PDF'));
      });
    });
  } catch (error) {
    console.error('Service Error:', error);
    throw new Error(`Failed to generate resume: ${error.message}`);
  }
}

module.exports = { generateResume }; 