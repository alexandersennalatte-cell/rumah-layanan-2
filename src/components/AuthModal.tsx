import React, { useState } from 'react';
import { UserCheck, Bell, Save, CheckCircle, LogOut } from 'lucide-react';
import { Modal, TextField, Checkbox, Button, Badge } from '@idds/react';
import { CitizenProfile, Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizen: CitizenProfile | null;
  onSaveProfile: (profile: CitizenProfile | null) => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  citizen,
  onSaveProfile,
  lang,
}) => {
  const isEn = lang === 'en';

  const defaultProfile: CitizenProfile = {
    id: 'usr-1',
    nik: '3524011204900001',
    fullName: 'Budi Santoso',
    email: 'budi.santoso@warga.lamongan.go.id',
    phone: '081234567890',
    kecamatan: 'Kec. Paciran',
    desa: 'Desa Drajat',
    savedServices: ['srv-1', 'srv-2', 'srv-4'],
    favoriteCameras: ['cctv-2', 'cctv-3'],
    floodAlerts: true,
    scholarshipAlerts: true,
    taxReminders: true,
  };

  const [formData, setFormData] = useState<CitizenProfile>(citizen || defaultProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDemoLogin = (profile: CitizenProfile) => {
    setFormData(profile);
    onSaveProfile(profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleLogout = () => {
    onSaveProfile(null);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2.5">
          <Badge variant="info" type="soft" className="text-xs font-bold">
            PORTAL WARGA
          </Badge>
          <span className="text-base sm:text-lg font-black tracking-wide uppercase text-slate-900 dark:text-white">
            {citizen ? (isEn ? 'Citizen Profile & Preferences' : 'Profil Warga Lamongan Megilan') : (isEn ? 'Citizen Sign In' : 'Masuk Portal Warga Lamongan')}
          </span>
        </div>
      }
    >
      <div className="space-y-5 pt-1">
        {/* Quick Demo Citizen Switcher */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block mb-1.5">
            {isEn ? 'Quick Demo Login (Pre-filled Lamongan Citizen):' : 'Akses Cepat Demo Akun Warga Terverifikasi:'}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin(defaultProfile)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs cursor-pointer"
            >
              Budi Santoso (Kec. Paciran - WBL)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin({
                id: 'usr-2',
                nik: '3524025408920002',
                fullName: 'Siti Rahmawati',
                email: 'siti.rahma@warga.lamongan.go.id',
                phone: '085712345678',
                kecamatan: 'Kec. Babat',
                desa: 'Desa Bedahan',
                savedServices: ['srv-2', 'srv-3'],
                favoriteCameras: ['cctv-2', 'cctv-4'],
                floodAlerts: true,
                scholarshipAlerts: true,
                taxReminders: true,
              })}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs cursor-pointer"
            >
              Siti Rahmawati (Kec. Babat)
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? 'Profile preferences saved successfully!' : 'Profil dan preferensi berhasil disimpan!'}</span>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <TextField
                label="Nama Lengkap *"
                value={formData.fullName}
                onChange={(val) => setFormData({ ...formData, fullName: val })}
                required
              />
            </div>

            <div>
              <TextField
                label="NIK Kependudukan (16 Digit) *"
                value={formData.nik}
                onChange={(val) => setFormData({ ...formData, nik: val })}
                maxLength={16}
                required
              />
            </div>

            <div>
              <TextField
                label="Kecamatan Domisili"
                value={formData.kecamatan}
                onChange={(val) => setFormData({ ...formData, kecamatan: val })}
              />
            </div>

            <div>
              <TextField
                label="Nomor WhatsApp / HP"
                value={formData.phone}
                onChange={(val) => setFormData({ ...formData, phone: val })}
              />
            </div>
          </div>

          {/* Notification & Personalization Toggles with INA DDS Checkbox */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-500" />
              <span>{isEn ? 'Personal Alert Subscriptions' : 'Langganan Notifikasi Personal'}</span>
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Checkbox
                  id="chk-flood"
                  label="Peringatan Dini Banjir Luapan Bengawan Solo (BPBD Lamongan)"
                  checked={formData.floodAlerts}
                  onChange={(checked) => setFormData({ ...formData, floodAlerts: checked })}
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Checkbox
                  id="chk-scholarship"
                  label="Pengumuman Beasiswa Pendidikan PERINTIS & Bantuan Sarjana"
                  checked={formData.scholarshipAlerts}
                  onChange={(checked) => setFormData({ ...formData, scholarshipAlerts: checked })}
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <Checkbox
                  id="chk-tax"
                  label="Pengingat Jatuh Tempo Pembayaran Pajak PBB-P2 Bapenda Lamongan"
                  checked={formData.taxReminders}
                  onChange={(checked) => setFormData({ ...formData, taxReminders: checked })}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons with INA DDS Buttons */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            {citizen ? (
              <Button
                hierarchy="tertiary"
                size="sm"
                type="button"
                onClick={handleLogout}
                prefixIcon={<LogOut className="w-4 h-4 text-red-600" />}
                className="text-red-600 hover:text-red-700 cursor-pointer font-bold"
              >
                {isEn ? 'Log Out' : 'Keluar Akun'}
              </Button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <Button
                hierarchy="secondary"
                size="md"
                type="button"
                onClick={onClose}
                className="cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Batal'}
              </Button>
              <Button
                hierarchy="primary"
                size="md"
                type="submit"
                prefixIcon={<Save className="w-4 h-4" />}
                className="cursor-pointer font-bold"
              >
                {isEn ? 'Save Preferences' : 'Simpan Profil'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
