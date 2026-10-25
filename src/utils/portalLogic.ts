import { Landmark, PublicServiceItem } from '../types';

/**
 * Generates an official tracking code for citizen complaints/aspirasi in Lamongan
 * Example: LMG-202610-8492
 */
export function generateComplaintTrackingCode(date: Date = new Date(), randomSeed?: number): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const code = randomSeed !== undefined 
    ? String(randomSeed).padStart(4, '0').slice(-4)
    : Math.floor(1000 + Math.random() * 9000);
  return `LMG-${year}${month}-${code}`;
}

/**
 * Validates Indonesian 16-digit NIK (Nomor Induk Kependudukan)
 */
export function validateCitizenNIK(nik: string): { isValid: boolean; message: string } {
  const sanitized = nik.trim();
  if (!sanitized) {
    return { isValid: false, message: 'NIK wajib diisi' };
  }
  if (!/^\d{16}$/.test(sanitized)) {
    return { isValid: false, message: 'NIK harus berupa 16 digit angka' };
  }
  return { isValid: true, message: 'NIK Valid' };
}

/**
 * Filter landmarks by keyword and optional category
 */
export function filterLandmarks(
  landmarks: Landmark[],
  query: string,
  category?: string
): Landmark[] {
  const q = query.trim().toLowerCase();
  return landmarks.filter((lm) => {
    const matchesCategory = !category || category === 'all' || lm.category === category;
    const matchesQuery =
      !q ||
      lm.name.toLowerCase().includes(q) ||
      lm.nameEn.toLowerCase().includes(q) ||
      lm.description.toLowerCase().includes(q) ||
      lm.location.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

/**
 * Filter public services by keyword and category
 */
export function filterServices(
  services: PublicServiceItem[],
  query: string,
  category?: string
): PublicServiceItem[] {
  const q = query.trim().toLowerCase();
  return services.filter((srv) => {
    const matchesCat = !category || category === 'all' || srv.category === category;
    const matchesQ =
      !q ||
      srv.name.toLowerCase().includes(q) ||
      srv.nameEn.toLowerCase().includes(q) ||
      srv.opd.toLowerCase().includes(q) ||
      srv.description.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });
}

/**
 * Formats large amounts to Indonesian Rupiah representation (Triliun, Miliar, Juta)
 */
export function formatIDRCurrency(val: number): string {
  if (val >= 1_000_000_000_000) {
    return `Rp ${(val / 1_000_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} Triliun`;
  }
  if (val >= 1_000_000_000) {
    return `Rp ${(val / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} Miliar`;
  }
  if (val >= 1_000_000) {
    return `Rp ${(val / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Juta`;
  }
  return `Rp ${val.toLocaleString('id-ID')}`;
}

/**
 * Computes mock device percentages ensuring they sum to 100%
 */
export function computeDevicePercentages(mobile: number, desktop: number, tablet: number) {
  const total = mobile + desktop + tablet;
  if (total === 0) return { mobile: 70, desktop: 25, tablet: 5 };
  const mPct = Math.round((mobile / total) * 100);
  const dPct = Math.round((desktop / total) * 100);
  const tPct = 100 - mPct - dPct;
  return { mobile: mPct, desktop: dPct, tablet: tPct };
}
