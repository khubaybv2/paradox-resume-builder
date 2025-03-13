const { jsPDF } = window.jspdf;

function updatePreview() {
    const fullName = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('previewHeader').innerText = `Resume of ${fullName}`;

    // Personal Info
    document.getElementById('previewEmail').innerText = 'Email: ' + (document.getElementById('email').value || 'email@example.com');
    document.getElementById('previewPhone').innerText = 'Phone: ' + (document.getElementById('phone').value || '(123) 456-7890');
    document.getElementById('previewAddress').innerText = 'Address: ' + (document.getElementById('address').value || 'City, Country');
    document.getElementById('previewReligion').innerText = 'Religion: ' + (document.getElementById('religion').value || '-');
    document.getElementById('previewParents').innerText = 'Parents: ' + 
        (document.getElementById('fatherName').value || 'Father\'s Name') + ' & ' + 
        (document.getElementById('motherName').value || 'Mother\'s Name');
    document.getElementById('previewMarital').innerText = 'Marital Status: ' + 
        (document.getElementById('maritalStatus').value || 'Single');

    // Education
    const educationForms = document.querySelectorAll('.education-form');
    let educationHTML = '';
    educationForms.forEach(edu => {
        const inputs = edu.querySelectorAll('input');
        educationHTML += `
            <div class="edu-item">
                <h3>${inputs[0].value || 'Degree'} (${inputs[2].value || 'Years'})</h3>
                <p>${inputs[1].value || 'University'}</p>
                ${inputs[3].value ? `<p>GPA/CGPA: ${inputs[3].value}</p>` : ''}
            </div>
        `;
    });
    document.getElementById('previewEducation').innerHTML = educationHTML;

    // Experience
    const experienceForms = document.querySelectorAll('.experience-form');
    let experienceHTML = '';
    experienceForms.forEach(exp => {
        const inputs = exp.querySelectorAll('input, textarea');
        experienceHTML += `
            <div class="exp-item">
                <h3>${inputs[0].value || 'Job Title'} @ ${inputs[1].value || 'Company'}</h3>
                <p>${inputs[2].value || 'Job Description'}</p>
            </div>
        `;
    });
    document.getElementById('previewExperience').innerHTML = experienceHTML;

    // Skills
    const skills = document.getElementById('skills').value || 'Skill 1, Skill 2';
    document.getElementById('previewSkills').innerHTML = skills.split(',').map(skill => `
        <span class="skill-tag">${skill.trim()}</span>
    `).join('');
}

function addEducation() {
    const educationForm = document.querySelector('.education-form');
    const clone = educationForm.cloneNode(true);
    clone.querySelectorAll('input').forEach(input => input.value = '');
    educationForm.parentNode.insertBefore(clone, educationForm.nextSibling);
    updatePreview();
}

function addExperience() {
    const experienceForm = document.querySelector('.experience-form');
    const clone = experienceForm.cloneNode(true);
    clone.querySelectorAll('input, textarea').forEach(input => input.value = '');
    experienceForm.parentNode.insertBefore(clone, experienceForm.nextSibling);
    updatePreview();
}

async function generatePDF() {
    const element = document.getElementById('resumePreview');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    await pdf.html(element, {
        margin: [20, 20, 20, 20], // 20mm margins on all sides
        width: 190,
        windowWidth: 794,
        autoPaging: 'text',
        callback: function(pdf) {
            pdf.save('Resume.pdf');
        }
    });
}

function generateDOCX() {
    const content = document.getElementById('resumePreview').innerHTML;
    const converted = htmlDocx.asBlob(content);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(converted);
    link.download = 'Resume.docx';
    link.click();
}

document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', updatePreview);
});

updatePreview();
