const API_URL = 'http://localhost:3000/api/v1/catatan';

// Ambil semua catatan saat halaman dibuka
document.addEventListener('DOMContentLoaded', fetchCatatan);

async function fetchCatatan() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    renderCatatan(json.data);
  } catch (err) {
    console.error('Gagal mengambil catatan:', err);
  }
}

function renderCatatan(data) {
  const list = document.getElementById('notes-list');
  const count = document.getElementById('notes-count');
  count.textContent = data.length;

  if (data.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div style="font-size:2.5rem">📭</div>
        <p>Belum ada catatan. Yuk tambahkan!</p>
      </div>`;
    return;
  }

  list.innerHTML = data.map(note => `
    <div class="note-card">
      <h3>${escapeHtml(note.judul)}</h3>
      <p>${escapeHtml(note.isi)}</p>
      <span class="note-date">${formatDate(note.tanggal_dibuat)}</span>
      <div class="note-actions">
        <button class="btn btn-edit" onclick="editCatatan(${note.id}, '${escapeHtml(note.judul)}', '${escapeHtml(note.isi)}')">Edit</button>
        <button class="btn btn-delete" onclick="deleteCatatan(${note.id})">Hapus</button>
      </div>
    </div>
  `).join('');
}

async function submitCatatan() {
  const id = document.getElementById('edit-id').value;
  const judul = document.getElementById('judul').value.trim();
  const isi = document.getElementById('isi').value.trim();

  if (!judul || !isi) {
    alert('Judul dan isi tidak boleh kosong!');
    return;
  }

  try {
    if (id) {
      // Mode edit
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi }),
      });
    } else {
      // Mode tambah
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi }),
      });
    }
    resetForm();
    fetchCatatan();
  } catch (err) {
    console.error('Gagal menyimpan catatan:', err);
  }
}

function editCatatan(id, judul, isi) {
  document.getElementById('edit-id').value = id;
  document.getElementById('judul').value = judul;
  document.getElementById('isi').value = isi;
  document.getElementById('form-title').textContent = 'Edit Catatan';
  document.getElementById('cancel-btn').style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteCatatan(id) {
  if (!confirm('Yakin ingin menghapus catatan ini?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchCatatan();
  } catch (err) {
    console.error('Gagal menghapus catatan:', err);
  }
}

function cancelEdit() {
  resetForm();
}

function resetForm() {
  document.getElementById('edit-id').value = '';
  document.getElementById('judul').value = '';
  document.getElementById('isi').value = '';
  document.getElementById('form-title').textContent = 'Tambah Catatan';
  document.getElementById('cancel-btn').style.display = 'none';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}