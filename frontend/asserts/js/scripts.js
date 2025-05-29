document.addEventListener('DOMContentLoaded', () => {
    console.log('Loyiha 7 script yuklandi!');

    // Dashboard uchun foydalanuvchi ismini ko'rsatish va chiqish tugmasi logikasi
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('foydalanuvchi_nomi');
        if (username) {
            usernameDisplay.textContent = `Salom, ${username}!`;
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('foydalanuvchi_nomi');
            window.location.href = '../pages/signin.html';
        });
    }

    // crud.html uchun foydalanuvchilarni olish va ko'rsatish
    const dataTable = document.getElementById('data-table');
    if (dataTable) {
        loadUsers();
        const form = document.getElementById('crud-form');
        if (form) {
            form.addEventListener('submit', saveUser);
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.addEventListener('click', clearForm);
            }
        }
    }

    function loadUsers() {
        fetch('/api/api_1/userdatas/') // Sizning API manzilingizga moslang (Loyiha 7)
            .then(response => response.json())
            .then(data => displayUsers(data))
            .catch(error => console.error('Foydalanuvchilarni olishda xatolik (Loyiha 7):', error));
    }

    function displayUsers(users) {
        const tbody = document.getElementById('data-body');
        if (tbody) {
            tbody.innerHTML = '';
            users.forEach(user => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Tahrirlash</button>
                        <button onclick="deleteUser(${user.id})">O'chirish</button>
                    </td>
                `;
            });
        }
    }

    function saveUser(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const idInput = document.getElementById('id');
        if (usernameInput && emailInput && idInput) {
            const username = usernameInput.value;
            const email = emailInput.value;
            const id = idInput.value;

            const userData = { username: username, email: email };
            const method = id ? 'PUT' : 'POST';
            const url = id ? `/api/api_1/userdatas/${id}/` : '/api/api_1/userdatas/'; // Sizning API manzilingizga moslang (Loyiha 7)

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(() => {
                loadUsers();
                clearForm();
            })
            .catch(error => console.error('Foydalanuvchini saqlashda xatolik (Loyiha 7):', error));
        }
    }

    function editUser(id) {
        fetch(`/api/api_1/userdatas/${id}/`) // Sizning API manzilingizga moslang (Loyiha 7)
            .then(response => response.json())
            .then(user => {
                document.getElementById('id').value = user.id;
                document.getElementById('username').value = user.username;
                document.getElementById('email').value = user.email;
                const cancelEditBtn = document.getElementById('cancel-edit');
                if (cancelEditBtn) {
                    cancelEditBtn.style.display = 'inline';
                }
            })
            .catch(error => console.error('Foydalanuvchini olishda xatolik (Loyiha 7):', error));
    }

    function deleteUser(id) {
        if (confirm('Foydalanuvchini o\'chirishga ishonchingiz komilmi?')) {
            fetch(`/api/api_1/userdatas/${id}/`, { // Sizning API manzilingizga moslang (Loyiha 7)
                method: 'DELETE',
                // Agar kerak bo'lsa, token qo'shing: 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            })
            .then(() => loadUsers())
            .catch(error => console.error('Foydalanuvchini o\'chirishda xatolik (Loyiha 7):', error));
        }
    }

    function clearForm() {
        const form = document.getElementById('crud-form');
        if (form) {
            form.reset();
            document.getElementById('id').value = '';
            const cancelEditBtn = document.getElementById('cancel-edit');
            if (cancelEditBtn) {
                cancelEditBtn.style.display = 'none';
            }
        }
    }

    // Dashboard uchun loglarni olish va ko'rsatish (dashboard.html)
    const logTable = document.getElementById('log-table');
    if (logTable) {
        loadLogs();
    }

    function loadLogs() {
        fetch('/api/api_2/systemlogs/') // Sizning API manzilingizga moslang (Loyiha 7)
            .then(response => response.json())
            .then(data => displayLogs(data))
            .catch(error => console.error('Loglarni olishda xatolik (Loyiha 7):', error));
    }

    function displayLogs(logs) {
        const tbody = document.getElementById('log-body');
        if (tbody) {
            tbody.innerHTML = '';
            logs.forEach(log => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${log.timestamp}</td>
                    <td>${log.log_level}</td>
                    <td>${log.message}</td>
                `;
            });
        }
    }
}); 
