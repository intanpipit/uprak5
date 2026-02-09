// Data barang titipan dan hilang
let barangTitipan = [
    {
        id: 1,
        nama: "Buku Matematika Kelas X",
        pemilik: "Rina Sari",
        kelas: "X IPA 1",
        tanggal: "2023-10-05",
        status: "dititipkan",
        deskripsi: "Buku matematika kelas X dengan sampul biru, ada nama Rina Sari di halaman depan.",
        lokasi: "Ruang Guru",
        kategori: "buku"
    },
    {
        id: 2,
        nama: "Dompet Kulit Coklat",
        pemilik: "Ahmad Fauzi",
        kelas: "XI IPS 2",
        tanggal: "2023-10-10",
        status: "dititipkan",
        deskripsi: "Dompet kulit warna coklat, berisi kartu pelajar dan uang Rp 50.000.",
        lokasi: "Kantin",
        kategori: "dompet"
    },
    {
        id: 3,
        nama: "Kalkulator Scientific",
        pemilik: "Budi Santoso",
        kelas: "XII IPA 3",
        tanggal: "2023-10-12",
        status: "diambil",
        deskripsi: "Kalkulator scientific Casio fx-991EX, warna hitam.",
        lokasi: "Lab Fisika",
        kategori: "elektronik"
    }
];

let barangHilang = [
    {
        id: 1,
        nama: "Jaket Olahraga SMA 1",
        pemilik: "Siti Nurhaliza",
        kelas: "X IPA 2",
        tanggal: "2023-10-08",
        status: "hilang",
        deskripsi: "Jaket olahraga resmi SMA 1 Magetan, ukuran L, warna biru tua dengan logo sekolah di dada kiri.",
        lokasi: "Lapangan Basket",
        kategori: "pakaian",
        waktu: "10:30"
    },
    {
        id: 2,
        nama: "Pulpen Parker",
        pemilik: "Dewi Anggraini",
        kelas: "XI IPA 1",
        tanggal: "2023-10-11",
        status: "ditemukan",
        deskripsi: "Pulpen Parker tinta hitam, body warna silver, ada inisial 'DA' di bagian bawah.",
        lokasi: "Perpustakaan",
        kategori: "alat-tulis",
        waktu: "13:45"
    },
    {
        id: 3,
        nama: "Powerbank 10.000mAh",
        pemilik: "Rizky Pratama",
        kelas: "XII IPS 1",
        tanggal: "2023-10-14",
        status: "hilang",
        deskripsi: "Powerbank Xiaomi 10.000mAh, warna putih, ada stiker bendera Indonesia di bagian belakang.",
        lokasi: "Lab Komputer",
        kategori: "elektronik",
        waktu: "09:15"
    },
    {
        id: 4,
        nama: "Topi Sekolah",
        pemilik: "Fajar Setiawan",
        kelas: "X IPA 3",
        tanggal: "2023-10-06",
        status: "ditemukan",
        deskripsi: "Topi sekolah SMA 1 Magetan, warna abu-abu dengan logo sekolah, ukuran standar.",
        lokasi: "Parkiran Sekolah",
        kategori: "pakaian",
        waktu: "07:20"
    }
];

// Inisialisasi variabel global
let currentBarangId = barangTitipan.length + barangHilang.length + 1;

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('.main-nav ul');
const contentSections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.main-nav a');
const btnActions = document.querySelectorAll('.btn-action');
const formTabs = document.querySelectorAll('.form-tab');
const laporanForm = document.getElementById('laporan-form');
const searchTitipan = document.getElementById('search-titipan');
const searchHilang = document.getElementById('search-hilang');
const filterStatusTitipan = document.getElementById('filter-status-titipan');
const filterStatusHilang = document.getElementById('filter-status-hilang');
const titipanTableBody = document.getElementById('titipan-table-body');
const hilangItemsContainer = document.getElementById('hilang-items-container');
const emptyTitipan = document.getElementById('empty-titipan');
const emptyHilang = document.getElementById('empty-hilang');
const fileInput = document.getElementById('gambar');
const fileName = document.getElementById('file-name');
const modal = document.getElementById('item-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const notificationIcon = document.getElementById('notification-icon');
const countTitipan = document.getElementById('count-titipan');
const countHilang = document.getElementById('count-hilang');
const countDitemukan = document.getElementById('count-ditemukan');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi aplikasi
    initApp();
    
    // Setup event listeners
    setupEventListeners();
    
    // Tampilkan data awal
    updateCounts();
    renderBarangTitipan();
    renderBarangHilang();
});

function initApp() {
    // Set tanggal hari ini di form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal').value = today;
    
    // Set waktu sekarang di form
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('waktu').value = `${hours}:${minutes}`;
}

function setupEventListeners() {
    // Toggle menu mobile
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Navigasi antar section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update menu aktif
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Tampilkan section yang sesuai
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                }
            });
            
            // Tutup menu mobile jika terbuka
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Quick action buttons
    btnActions.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Update menu aktif
            navLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelector(`a[data-section="${sectionId}"]`).classList.add('active');
            
            // Tampilkan section yang sesuai
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Form tabs
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const formType = this.getAttribute('data-form-type');
            
            // Update tab aktif
            formTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update form berdasarkan tab
            if (formType === 'titip') {
                // Update placeholder untuk titip barang
                document.getElementById('lokasi').placeholder = "Contoh: Titip ke guru piket, Ruang TU";
                document.querySelector('.btn-submit i').className = "fas fa-box";
                document.querySelector('.btn-submit').innerHTML = '<i class="fas fa-box"></i> Titip Barang';
            } else {
                // Update placeholder untuk lapor barang hilang
                document.getElementById('lokasi').placeholder = "Contoh: Lab Komputer, Lapangan Basket, Kantin";
                document.querySelector('.btn-submit i').className = "fas fa-paper-plane";
                document.querySelector('.btn-submit').innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Laporan';
            }
        });
    });
    
    // Form submission
    laporanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data dari form
        const namaBarang = document.getElementById('nama-barang').value;
        const kategori = document.getElementById('kategori').value;
        const namaPemilik = document.getElementById('nama-pemilik').value;
        const kelas = document.getElementById('kelas').value;
        const deskripsi = document.getElementById('deskripsi').value;
        const lokasi = document.getElementById('lokasi').value;
        const tanggal = document.getElementById('tanggal').value;
        const waktu = document.getElementById('waktu').value;
        const formType = document.querySelector('.form-tab.active').getAttribute('data-form-type');
        
        // Buat objek barang baru
        const newItem = {
            id: currentBarangId++,
            nama: namaBarang,
            pemilik: namaPemilik,
            kelas: kelas,
            tanggal: tanggal,
            status: formType === 'titip' ? 'dititipkan' : 'hilang',
            deskripsi: deskripsi,
            lokasi: lokasi,
            kategori: kategori,
            waktu: formType === 'titip' ? null : waktu
        };
        
        // Tambahkan ke array yang sesuai
        if (formType === 'titip') {
            barangTitipan.unshift(newItem);
            renderBarangTitipan();
            showNotification('Barang berhasil dititipkan!', 'success');
        } else {
            barangHilang.unshift(newItem);
            renderBarangHilang();
            showNotification('Laporan barang hilang berhasil dikirim!', 'success');
        }
        
        // Update counters
        updateCounts();
        
        // Reset form
        laporanForm.reset();
        fileName.textContent = 'Belum ada file dipilih';
        
        // Kembali ke section yang sesuai
        if (formType === 'titip') {
            document.querySelector('a[data-section="titipan"]').click();
        } else {
            document.querySelector('a[data-section="hilang"]').click();
        }
    });
    
    // File input change
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'Belum ada file dipilih';
        }
    });
    
    // Pencarian barang titipan
    searchTitipan.addEventListener('input', renderBarangTitipan);
    filterStatusTitipan.addEventListener('change', renderBarangTitipan);
    
    // Pencarian barang hilang
    searchHilang.addEventListener('input', renderBarangHilang);
    filterStatusHilang.addEventListener('change', renderBarangHilang);
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Fungsi untuk render barang titipan
function renderBarangTitipan() {
    const searchTerm = searchTitipan.value.toLowerCase();
    const filterStatus = filterStatusTitipan.value;
    
    // Filter barang titipan
    let filteredItems = barangTitipan.filter(item => {
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm) ||
                             item.pemilik.toLowerCase().includes(searchTerm) ||
                             item.kelas.toLowerCase().includes(searchTerm);
        
        const matchesStatus = filterStatus === 'semua' || item.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });
    
    // Update tabel
    titipanTableBody.innerHTML = '';
    
    if (filteredItems.length === 0) {
        emptyTitipan.style.display = 'block';
        return;
    }
    
    emptyTitipan.style.display = 'none';
    
    filteredItems.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // Format tanggal
        const dateObj = new Date(item.tanggal);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Status badge
        let statusText, statusClass;
        if (item.status === 'dititipkan') {
            statusText = 'Masih Dititipkan';
            statusClass = 'status-dititipkan';
        } else {
            statusText = 'Sudah Diambil';
            statusClass = 'status-diambil';
        }
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.nama}</strong></td>
            <td>${item.pemilik}</td>
            <td>${item.kelas}</td>
            <td>${formattedDate}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td><button class="btn-detail" onclick="showDetail('titipan', ${item.id})">Detail</button></td>
        `;
        
        titipanTableBody.appendChild(row);
    });
}

// Fungsi untuk render barang hilang
function renderBarangHilang() {
    const searchTerm = searchHilang.value.toLowerCase();
    const filterStatus = filterStatusHilang.value;
    
    // Filter barang hilang
    let filteredItems = barangHilang.filter(item => {
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm) ||
                             item.pemilik.toLowerCase().includes(searchTerm) ||
                             item.kelas.toLowerCase().includes(searchTerm);
        
        const matchesStatus = filterStatus === 'semua' || item.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });
    
    // Update grid
    hilangItemsContainer.innerHTML = '';
    
    if (filteredItems.length === 0) {
        emptyHilang.style.display = 'block';
        return;
    }
    
    emptyHilang.style.display = 'none';
    
    filteredItems.forEach(item => {
        // Format tanggal
        const dateObj = new Date(item.tanggal);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        // Icon berdasarkan kategori
        let categoryIcon;
        switch(item.kategori) {
            case 'elektronik':
                categoryIcon = 'fas fa-laptop';
                break;
            case 'alat-tulis':
                categoryIcon = 'fas fa-pen';
                break;
            case 'pakaian':
                categoryIcon = 'fas fa-tshirt';
                break;
            case 'tas':
                categoryIcon = 'fas fa-briefcase';
                break;
            case 'dompet':
                categoryIcon = 'fas fa-wallet';
                break;
            case 'buku':
                categoryIcon = 'fas fa-book';
                break;
            default:
                categoryIcon = 'fas fa-cube';
        }
        
        // Status badge
        let statusText, statusClass;
        if (item.status === 'hilang') {
            statusText = 'Masih Hilang';
            statusClass = 'status-hilang';
        } else {
            statusText = 'Sudah Ditemukan';
            statusClass = 'status-ditemukan';
        }
        
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-image">
                <i class="${categoryIcon}"></i>
            </div>
            <div class="item-content">
                <h3 class="item-title">${item.nama}</h3>
                <div class="item-meta">
                    <span><i class="fas fa-user"></i> ${item.pemilik}</span>
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                </div>
                <p class="item-description">${item.deskripsi.substring(0, 100)}...</p>
                <div class="item-actions">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <button class="btn-detail" onclick="showDetail('hilang', ${item.id})">Detail</button>
                </div>
            </div>
        `;
        
        hilangItemsContainer.appendChild(card);
    });
}

// Fungsi untuk menampilkan detail barang
function showDetail(type, id) {
    let item;
    
    if (type === 'titipan') {
        item = barangTitipan.find(item => item.id === id);
        modalTitle.textContent = 'Detail Barang Titipan';
    } else {
        item = barangHilang.find(item => item.id === id);
        modalTitle.textContent = 'Detail Barang Hilang';
    }
    
    if (!item) return;
    
    // Format tanggal
    const dateObj = new Date(item.tanggal);
    const formattedDate = dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Icon berdasarkan kategori
    let categoryIcon, categoryText;
    switch(item.kategori) {
        case 'elektronik':
            categoryIcon = 'fas fa-laptop';
            categoryText = 'Elektronik';
            break;
        case 'alat-tulis':
            categoryIcon = 'fas fa-pen';
            categoryText = 'Alat Tulis';
            break;
        case 'pakaian':
            categoryIcon = 'fas fa-tshirt';
            categoryText = 'Pakaian';
            break;
        case 'tas':
            categoryIcon = 'fas fa-briefcase';
            categoryText = 'Tas';
            break;
        case 'dompet':
            categoryIcon = 'fas fa-wallet';
            categoryText = 'Dompet & Uang';
            break;
        case 'buku':
            categoryIcon = 'fas fa-book';
            categoryText = 'Buku';
            break;
        default:
            categoryIcon = 'fas fa-cube';
            categoryText = 'Lainnya';
    }
    
    // Status badge
    let statusText, statusClass;
    if (type === 'titipan') {
        if (item.status === 'dititipkan') {
            statusText = 'Masih Dititipkan';
            statusClass = 'status-dititipkan';
        } else {
            statusText = 'Sudah Diambil';
            statusClass = 'status-diambil';
        }
    } else {
        if (item.status === 'hilang') {
            statusText = 'Masih Hilang';
            statusClass = 'status-hilang';
        } else {
            statusText = 'Sudah Ditemukan';
            statusClass = 'status-ditemukan';
        }
    }
    
    // Buat konten modal
    let modalContent = `
        <div class="modal-detail">
            <div class="modal-row">
                <span class="modal-label">Nama Barang</span>
                <span><strong>${item.nama}</strong></span>
            </div>
            <div class="modal-row">
                <span class="modal-label">Kategori</span>
                <span><i class="${categoryIcon}"></i> ${categoryText}</span>
            </div>
            <div class="modal-row">
                <span class="modal-label">Pemilik</span>
                <span>${item.pemilik} (${item.kelas})</span>
            </div>
            <div class="modal-row">
                <span class="modal-label">Tanggal</span>
                <span>${formattedDate}${item.waktu ? `, ${item.waktu} WIB` : ''}</span>
            </div>
            <div class="modal-row">
                <span class="modal-label">Lokasi</span>
                <span>${item.lokasi}</span>
            </div>
            <div class="modal-row">
                <span class="modal-label">Status</span>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="modal-row" style="align-items: flex-start;">
                <span class="modal-label">Deskripsi</span>
                <span>${item.deskripsi}</span>
            </div>
            ${type === 'titipan' && item.status === 'dititipkan' ? `
            <div class="modal-row" style="margin-top: 20px;">
                <button class="btn-submit" style="width: 100%;" onclick="markAsTaken(${item.id})">
                    <i class="fas fa-check-circle"></i> Tandai Sudah Diambil
                </button>
            </div>
            ` : ''}
            ${type === 'hilang' && item.status === 'hilang' ? `
            <div class="modal-row" style="margin-top: 20px;">
                <button class="btn-submit" style="width: 100%;" onclick="markAsFound(${item.id})">
                    <i class="fas fa-check-circle"></i> Tandai Sudah Ditemukan
                </button>
            </div>
            ` : ''}
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.style.display = 'flex';
}

// Fungsi untuk menutup modal
function closeModal() {
    modal.style.display = 'none';
}

// Fungsi untuk menandai barang titipan sudah diambil
function markAsTaken(id) {
    const itemIndex = barangTitipan.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        barangTitipan[itemIndex].status = 'diambil';
        renderBarangTitipan();
        updateCounts();
        closeModal();
        showNotification('Status barang berhasil diperbarui!', 'success');
    }
}

// Fungsi untuk menandai barang hilang sudah ditemukan
function markAsFound(id) {
    const itemIndex = barangHilang.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        barangHilang[itemIndex].status = 'ditemukan';
        renderBarangHilang();
        updateCounts();
        closeModal();
        showNotification('Status barang berhasil diperbarui!', 'success');
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type) {
    notificationText.textContent = message;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
        notificationIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
        notificationIcon.className = 'fas fa-exclamation-circle';
    } else {
        notification.style.backgroundColor = '#3498db';
        notificationIcon.className = 'fas fa-info-circle';
    }
    
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Fungsi untuk update counter di halaman beranda
function updateCounts() {
    // Hitung barang titipan yang masih dititipkan
    const countTitipanActive = barangTitipan.filter(item => item.status === 'dititipkan').length;
    countTitipan.textContent = countTitipanActive;
    
    // Hitung barang hilang yang masih hilang
    const countHilangActive = barangHilang.filter(item => item.status === 'hilang').length;
    countHilang.textContent = countHilangActive;
    
    // Hitung barang hilang yang sudah ditemukan
    const countDitemukanActive = barangHilang.filter(item => item.status === 'ditemukan').length;
    countDitemukan.textContent = countDitemukanActive;
}