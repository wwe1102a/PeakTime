document.getElementById('registerBtn').addEventListener('click', async () => {

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const email = document.getElementById('email').value.trim();
    const nickname = document.getElementById('nickname').value.trim();
  

    if (password !== repassword) {
      alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,       
          nickname: nickname  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('สมัครสมาชิกสำเร็จ!');
        console.log('ผลลัพธ์จากเซิร์ฟเวอร์:', data);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('repassword').value = '';
        document.getElementById('email').value = '';
        document.getElementById('nickname').value = '';
        window.location.href = 'signin.html';
      } else {
        alert('การสมัครสมาชิกล้มเหลว: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาเช็กว่า Backend รันอยู่หรือไม่');
    }
  });