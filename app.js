function convertImageToJPG(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const jpgDataUrl = canvas.toDataURL('image/jpeg');
        callback(jpgDataUrl);
        document.getElementById('originalImage').style.display = 'none';
    };
    img.src = imageUrl;
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/webp' || file.type === 'image/avif')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const originalImage = document.getElementById('originalImage');
            originalImage.src = imageUrl;
            originalImage.style.display = 'block';
            convertImageToJPG(imageUrl, (jpgDataUrl) => {
                const convertedImage = document.getElementById('convertedImage');
                convertedImage.src = jpgDataUrl;
                convertedImage.style.display = 'block';
                originalImage.style.display = 'none';
            });
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a WebP or AVIF image.');
    }
}

document.getElementById('uploadWebP').addEventListener('change', handleFileUpload);
document.getElementById('uploadAVIF').addEventListener('change', handleFileUpload);