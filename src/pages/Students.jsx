import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import SearchInput from '../components/common/SearchInput';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import Modal from '../components/common/Modal';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import { getErrorMessage } from '../services/api';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import { getClassRooms } from '../services/classRoomService';
import { getGuardians } from '../services/guardianService';
import { formatDate } from '../utils/format';

const PAGE_SIZE = 10;

// Nilai enum BE (angka): Gender & StudentStatus
const GENDERS = [{ value: 1, label: 'Laki-laki' }, { value: 2, label: 'Perempuan' }];
const STATUSES = [
  { value: 1, label: 'Aktif' },
  { value: 2, label: 'Lulus' },
  { value: 3, label: 'Pindah' },
  { value: 4, label: 'Nonaktif' },
];

const emptyForm = {
  nis: '', nisn: '', fullName: '', gender: 1, birthPlace: '', birthDate: '',
  address: '', classRoomId: '', guardianId: '', status: 1,
  enrollmentDate: new Date().toISOString().slice(0, 10), isActive: true,
};

const toDateInput = (v) => (v ? String(v).slice(0, 10) : '');

const inputCls = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      {children}
    </label>
  );
}

function StudentForm({ initial, classRooms, guardians, onClose, onSaved }) {
  const editing = Boolean(initial?.id);
  const [form, setForm] = useState(initial ?? emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      nis: form.nis.trim(),
      nisn: form.nisn?.trim() || null,
      fullName: form.fullName.trim(),
      gender: Number(form.gender),
      birthPlace: form.birthPlace?.trim() || null,
      birthDate: form.birthDate,
      address: form.address?.trim() || null,
      photoUrl: form.photoUrl || null,
      classRoomId: form.classRoomId,
      guardianId: form.guardianId,
      status: Number(form.status),
      enrollmentDate: form.enrollmentDate,
    };

    try {
      if (editing) await updateStudent(initial.id, { ...payload, isActive: form.isActive });
      else await createStudent(payload);
      onSaved();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={editing ? 'Ubah Data Siswa' : 'Tambah Siswa'}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
            Batal
          </button>
          <button form="student-form" disabled={saving} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </>
      }
    >
      <form id="student-form" onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {error && <div className="sm:col-span-2"><ErrorState message={error} /></div>}
        <Field label="NIS"><input required className={inputCls} value={form.nis} onChange={set('nis')} /></Field>
        <Field label="NISN"><input className={inputCls} value={form.nisn ?? ''} onChange={set('nisn')} /></Field>
        <div className="sm:col-span-2">
          <Field label="Nama Lengkap"><input required className={inputCls} value={form.fullName} onChange={set('fullName')} /></Field>
        </div>
        <Field label="Jenis Kelamin">
          <select className={inputCls} value={form.gender} onChange={set('gender')}>
            {GENDERS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={inputCls} value={form.status} onChange={set('status')}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Tempat Lahir"><input className={inputCls} value={form.birthPlace ?? ''} onChange={set('birthPlace')} /></Field>
        <Field label="Tanggal Lahir"><input required type="date" className={inputCls} value={form.birthDate} onChange={set('birthDate')} /></Field>
        <Field label="Kelas">
          <select required className={inputCls} value={form.classRoomId} onChange={set('classRoomId')}>
            <option value="">Pilih kelas</option>
            {classRooms.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Wali Murid">
          <select required className={inputCls} value={form.guardianId} onChange={set('guardianId')}>
            <option value="">Pilih wali</option>
            {guardians.map((g) => <option key={g.id} value={g.id}>{g.fullName}</option>)}
          </select>
        </Field>
        <Field label="Tanggal Masuk"><input required type="date" className={inputCls} value={form.enrollmentDate} onChange={set('enrollmentDate')} /></Field>
        {editing && (
          <Field label="Akun Aktif">
            <select className={inputCls} value={String(form.isActive)} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.value === 'true' }))}>
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>
          </Field>
        )}
        <div className="sm:col-span-2">
          <Field label="Alamat"><textarea rows={2} className={inputCls} value={form.address ?? ''} onChange={set('address')} /></Field>
        </div>
      </form>
    </Modal>
  );
}

export default function Students() {
  const [search, setSearch] = useState('');
  const [classRoomId, setClassRoomId] = useState('');
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState(null); // null | { initial }
  const [deleting, setDeleting] = useState(null);
  const [actionError, setActionError] = useState(null);
  const keyword = useDebounce(search.trim());

  const students = useApi(
    (signal) => getStudents({ keyword: keyword || undefined, classRoomId: classRoomId || undefined, pageNumber: page, pageSize: PAGE_SIZE }, signal),
    [keyword, classRoomId, page]
  );
  const classRooms = useApi((signal) => getClassRooms(undefined, signal), []);
  const guardians = useApi((signal) => getGuardians(undefined, signal), []);

  const classList = classRooms.data?.items ?? [];
  const guardianList = guardians.data?.items ?? [];
  const items = students.data?.items ?? [];

  async function confirmDelete() {
    try {
      await deleteStudent(deleting.id);
      setDeleting(null);
      students.reload();
    } catch (err) {
      setActionError(getErrorMessage(err));
      setDeleting(null);
    }
  }

  function openEdit(s) {
    setEditor({
      initial: {
        ...s,
        nisn: s.nisn ?? '',
        birthDate: toDateInput(s.birthDate),
        enrollmentDate: toDateInput(s.enrollmentDate),
      },
    });
  }

  return (
    <div>
      <PageHeader title="Data Siswa" subtitle="Kelola data peserta didik">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Cari nama atau NIS..." />
        <select
          value={classRoomId}
          onChange={(e) => { setClassRoomId(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
        >
          <option value="">Semua kelas</option>
          {classList.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button
          onClick={() => setEditor({ initial: null })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          <Plus size={16} /> Tambah Siswa
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {(students.error || actionError) && (
          <div className="mb-4"><ErrorState message={students.error || actionError} onRetry={students.reload} /></div>
        )}

        <div className={`overflow-x-auto ${students.loading ? 'opacity-60' : ''}`}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <th className="pb-3 font-semibold">NIS</th>
                <th className="pb-3 font-semibold">NAMA</th>
                <th className="pb-3 font-semibold">KELAS</th>
                <th className="pb-3 font-semibold">WALI</th>
                <th className="pb-3 font-semibold">MASUK</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && !students.loading && (
                <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-400">Tidak ada siswa ditemukan.</td></tr>
              )}
              {items.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-600">{s.nis}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{s.fullName}</td>
                  <td className="py-3 text-sm text-gray-600">{s.classRoomName}</td>
                  <td className="py-3 text-sm text-gray-600">{s.guardianName}</td>
                  <td className="py-3 text-sm text-gray-600">{formatDate(s.enrollmentDate)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {STATUSES.find((x) => x.value === s.status)?.label ?? '-'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <button onClick={() => openEdit(s)} className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                      <button onClick={() => setDeleting(s)} className="text-red-600 hover:text-red-800 font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} total={students.data?.totalRecords ?? 0} onChange={setPage} unit="siswa" />
      </div>

      {editor && (
        <StudentForm
          initial={editor.initial}
          classRooms={classList}
          guardians={guardianList}
          onClose={() => setEditor(null)}
          onSaved={() => { setEditor(null); setActionError(null); students.reload(); }}
        />
      )}

      {deleting && (
        <Modal
          title="Hapus Siswa"
          onClose={() => setDeleting(null)}
          footer={
            <>
              <button onClick={() => setDeleting(null)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
            </>
          }
        >
          <p className="text-sm text-gray-600">Hapus data <b>{deleting.fullName}</b> ({deleting.nis})? Tindakan ini tidak dapat dibatalkan dari aplikasi.</p>
        </Modal>
      )}
    </div>
  );
}
