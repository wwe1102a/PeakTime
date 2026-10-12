document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            
            localStorage.setItem('token', 'true');
            
            
            localStorage.setItem('nickname', data.user.nickname);
            
            
            localStorage.setItem('user', JSON.stringify(data.user));

            alert('เข้าสู่ระบบสำเร็จ!');
            window.location.href = 'index.html';
        
        } else {
            
            alert(data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
});