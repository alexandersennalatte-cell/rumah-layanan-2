import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateComplaintTrackingCode,
  validateCitizenNIK,
  filterLandmarks,
  filterServices,
  formatIDRCurrency,
  computeDevicePercentages
} from './portalLogic';
import { Landmark, PublicServiceItem } from '../types';

test('generateComplaintTrackingCode creates correct prefix and year-month pattern', () => {
  const sampleDate = new Date('2026-10-24T12:00:00Z');
  const code = generateComplaintTrackingCode(sampleDate, 4521);
  assert.equal(code, 'LMG-202610-4521');
});

test('validateCitizenNIK accurately checks 16 digits', () => {
  assert.equal(validateCitizenNIK('3524011204900001').isValid, true);
  assert.equal(validateCitizenNIK('352401').isValid, false);
  assert.equal(validateCitizenNIK('352401120490000A').isValid, false);
  assert.equal(validateCitizenNIK('').isValid, false);
});

test('filterLandmarks filters by category and keyword', () => {
  const dummyLandmarks: Landmark[] = [
    {
      id: 'wbl-paciran',
      name: 'Wisata Bahari Lamongan (WBL)',
      nameEn: 'Lamongan Marine Tourism (WBL)',
      category: 'nature',
      description: 'Taman rekreasi bahari terpadu di Tanjung Kodok',
      descriptionEn: 'Integrated marine theme park at Tanjung Kodok',
      location: 'Paciran',
      x: 35,
      y: 15,
      iconType: 'water',
      highlight: 'Ikon Wisata Bahari Jatim',
      highlightEn: 'East Java Marine Icon',
      historicalFact: 'Eksistensi Tanjung Kodok sejak era kolonial',
      historicalFactEn: 'Historic coastal cape'
    },
    {
      id: 'sunan-drajat',
      name: 'Makam Sunan Drajat',
      nameEn: 'Sunan Drajat Tomb & Museum',
      category: 'heritage',
      description: 'Cagar budaya makam salah satu Wali Songo',
      descriptionEn: 'Heritage site of the Wali Songo saint',
      location: 'Drajat, Paciran',
      x: 45,
      y: 18,
      iconType: 'culture',
      highlight: 'Filosofi Catur Piwulang',
      highlightEn: 'Four Sacred Teachings',
      historicalFact: 'Penyebar agama Islam abad ke-15 di pesisir utara',
      historicalFactEn: '15th century Islamic pioneer'
    }
  ];

  const searchWBL = filterLandmarks(dummyLandmarks, 'WBL');
  assert.equal(searchWBL.length, 1);
  assert.equal(searchWBL[0].id, 'wbl-paciran');

  const heritageCategory = filterLandmarks(dummyLandmarks, '', 'heritage');
  assert.equal(heritageCategory.length, 1);
  assert.equal(heritageCategory[0].id, 'sunan-drajat');
});

test('formatIDRCurrency formats trillions and billions correctly', () => {
  assert.match(formatIDRCurrency(8_250_000_000_000), /Rp 8,25 Triliun/);
  assert.match(formatIDRCurrency(450_000_000_000), /Rp 450 Miliar/);
});

test('computeDevicePercentages sums to 100', () => {
  const res = computeDevicePercentages(680, 280, 40);
  assert.equal(res.mobile + res.desktop + res.tablet, 100);
});
