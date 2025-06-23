const templates = {
            modern: {
                color1: '#667eea',
                color2: '#764ba2',
                textColor: '#ffffff',
                direction: '135deg'
            },
            minimal: {
                color1: '#f8f9fa',
                color2: '#e9ecef',
                textColor: '#343a40',
                direction: '90deg'
            },
            vibrant: {
                color1: '#ff6b6b',
                color2: '#4ecdc4',
                textColor: '#ffffff',
                direction: '45deg'
            },
            elegant: {
                color1: '#2c3e50',
                color2: '#34495e',
                textColor: '#ffffff',
                direction: '0deg'
            }
        };

        function updatePost() {
            const businessName = document.getElementById('businessName').value || 'Your Business';
            const mainText = document.getElementById('mainText').value || 'Amazing Products & Services';
            const subText = document.getElementById('subText').value || 'Visit us today!';
            const color1 = document.getElementById('color1').value;
            const color2 = document.getElementById('color2').value;
            const textColor = document.getElementById('textColor').value;
            const direction = document.getElementById('gradientDirection').value;

            document.getElementById('logoText').textContent = businessName;
            document.getElementById('mainTextDisplay').textContent = mainText;
            document.getElementById('subTextDisplay').textContent = subText;

            const postContent = document.getElementById('postContent');
            postContent.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
            postContent.style.color = textColor;
        }

        function applyTemplate(templateName) {
            const template = templates[templateName];
            document.getElementById('color1').value = template.color1;
            document.getElementById('color2').value = template.color2;
            document.getElementById('textColor').value = template.textColor;
            document.getElementById('gradientDirection').value = template.direction;
            
            // Update active button
            document.querySelectorAll('.template-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.template === templateName) {
                    btn.classList.add('active');
                }
            });
            
            updatePost();
        }

        async function downloadPost() {
            const canvas = document.getElementById('postCanvas');
            const downloadBtn = document.querySelector('.download-btn');
            
            downloadBtn.textContent = '📸 Generating...';
            downloadBtn.disabled = true;
            
            try {
                const canvasElement = await html2canvas(canvas, {
                    width: 400,
                    height: 400,
                    scale: 2,
                    backgroundColor: null,
                    useCORS: true,
                    allowTaint: true
                });
                
                const link = document.createElement('a');
                link.download = 'business-post.png';
                link.href = canvasElement.toDataURL('image/png', 1.0);
                link.click();
            } catch (error) {
                console.error('Error generating image:', error);
                alert('Error generating image. Please try again.');
            } finally {
                downloadBtn.textContent = '📥 Download as PNG';
                downloadBtn.disabled = false;
            }
        }

        // Event listeners
        document.getElementById('businessName').addEventListener('input', updatePost);
        document.getElementById('mainText').addEventListener('input', updatePost);
        document.getElementById('subText').addEventListener('input', updatePost);
        document.getElementById('color1').addEventListener('change', updatePost);
        document.getElementById('color2').addEventListener('change', updatePost);
        document.getElementById('textColor').addEventListener('change', updatePost);
        document.getElementById('gradientDirection').addEventListener('change', updatePost);

        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', () => applyTemplate(btn.dataset.template));
        });

        // Initialize
        updatePost();