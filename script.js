// ฟังก์ชันสำหรับสร้างรหัสการจอง
function generateBookingCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

document.getElementById('confirmBooking').addEventListener('click', function() {
    const selectedTimeButton = document.querySelector('#time-options button.selected');

    if (!selectedTimeButton) {
        alert("กรุณาเลือกเวลาจอง");
        return;
    }

    const time = selectedTimeButton.dataset.time;
    const people = document.getElementById('people').value;

    // ตรวจสอบข้อมูล (เช่น จำนวนคนต้องมากกว่า 0)
    if (people <= 0) {
        alert('กรุณาใส่จำนวนคนให้ถูกต้อง');
        return;
    }

    // สร้างรหัสการจอง
    const bookingCode = generateBookingCode();

    // แสดงกล่องข้อความแจ้งเตือน
    const name = prompt("กรุณาระบุชื่อ:");
    if (name === null) {
        return; // หากผู้ใช้กดยกเลิก
    }
    let phone = prompt("กรุณาระบุเบอร์โทรศัพท์:");
    if (phone === null) {
        return; // หากผู้ใช้กดยกเลิก
    }

    // ตรวจสอบและจำกัดเบอร์โทรศัพท์
    phone = phone.replace(/[^0-9]/g, ''); // ลบตัวอักษรทั้งหมด
    if (phone.length > 10) {
        phone = phone.slice(0, 10);
    }
    if (phone.length > 0 && phone[0] !== '0') {
        phone = '0' + phone.slice(1); // เพิ่ม 0 ด้านหน้าหากไม่ใช่เลข 0
    }

    // ตรวจสอบความถูกต้องของเบอร์โทรศัพท์อีกครั้ง (หลังจากปรับปรุงแล้ว)
    if (phone.length !== 10 || phone[0] !== '0') {
        alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลักและขึ้นต้นด้วย 0)");
        return;
    }

    // คำนวณราคา
    const pricePerPerson = 249;
    const totalPrice = pricePerPerson * people;

    // แสดงผลลัพธ์การจอง (ไม่แสดงนามสกุล)
    const resultDiv = document.getElementById('booking-result');
    resultDiv.innerHTML = `<h2>การจองสำเร็จ!</h2>
                            <p>รหัสการจอง: ${bookingCode}</p>
                            <p>รอบเวลา: ${time}</p>
                            <p>จำนวนคน: ${people}</p>
                            <p>ชื่อ: ${name}</p>
                            <p>เบอร์โทร: ${phone}</p>
                            <p>ราคารวม: ${totalPrice} บาท</p>`;
});

const timeOptions = document.querySelectorAll('#time-options button');
let selectedTime = null; // เก็บเวลาที่ถูกเลือก

timeOptions.forEach(button => {
    button.addEventListener('click', function() {
        const time = this.dataset.time;

        // ยกเลิกการเลือกปุ่มเดิม (ถ้ามี)
        if (selectedTime) {
            const previousButton = document.querySelector(`#time-options button[data-time="${selectedTime}"]`);
            previousButton.classList.remove('selected');
        }

        // เลือกปุ่มใหม่
        this.classList.add('selected');
        selectedTime = time;
    });
});