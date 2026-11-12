import React, { useEffect, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useRoster } from '../../context/RosterContext';
import {
  normalizeEmploymentHistory,
  getEmploymentPercentageForDate,
} from '../../utils/helpers';

const fieldClass = "h-10 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const labelClass = "mb-1.5 block text-xs font-semibold tracking-wide text-slate-600";

function getEmploymentPercentage(member) {
  const percentage = Number(member?.employmentPercentage);
  return Number.isFinite(percentage) && percentage >= 1 && percentage <= 100
    ? percentage
    : 100;
}

function getLocalDateKey() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function isValidDateKey(value) {
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(value || '')) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && date.getFullYear() === Number(value.slice(0, 4))
    && date.getMonth() + 1 === Number(value.slice(5, 7))
    && date.getDate() === Number(value.slice(8, 10));
}

export default function EditMemberModal() {
  const { t, editingMember, setEditingMember, roles, updateMember } = useRoster();
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [historyError, setHistoryError] = useState('');

  useEffect(() => {
    if (!editingMember) return;
    setEmploymentHistory(
      normalizeEmploymentHistory(editingMember.employmentHistory, getEmploymentPercentage(editingMember))
    );
    setHistoryError('');
  }, [editingMember?.id, editingMember?.employmentPercentage, JSON.stringify(editingMember?.employmentHistory || [])]);

  if (!editingMember) return null;

  const currentPercentage = getEmploymentPercentageForDate({ employmentHistory }, getLocalDateKey());

  const updateHistoryEntry = (index, field, value) => {
    setEmploymentHistory(previous => previous.map((entry, entryIndex) => (
      entryIndex === index ? { ...entry, [field]: value } : entry
    )));
    setHistoryError('');
  };

  const addHistoryEntry = () => {
    const lastPercentage = employmentHistory[employmentHistory.length - 1]?.percentage ?? currentPercentage;
    setEmploymentHistory(previous => [...previous, { effectiveFrom: '', percentage: lastPercentage }]);
    setHistoryError('');
  };

  const removeHistoryEntry = (index) => {
    setEmploymentHistory(previous => previous.length > 1
      ? previous.filter((_, entryIndex) => entryIndex !== index)
      : previous
    );
    setHistoryError('');
  };

  const handleSubmit = (event) => {
    const seenDates = new Set();
    for (const entry of employmentHistory) {
      const date = String(entry.effectiveFrom || '');
      const percentage = Number(entry.percentage);
      if (!isValidDateKey(date)) {
        event.preventDefault();
        setHistoryError(t('employment_history_invalid_date'));
        return;
      }
      if (seenDates.has(date)) {
        event.preventDefault();
        setHistoryError(t('employment_history_duplicate_date'));
        return;
      }
      if (!Number.isFinite(percentage) || percentage < 1 || percentage > 100) {
        event.preventDefault();
        setHistoryError(t('employment_history_invalid_percentage'));
        return;
      }
      seenDates.add(date);
    }
    updateMember(event);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="my-auto flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">{t('edit_team_member')}</h3>
          <button type="button" onClick={() => setEditingMember(null)} aria-label={t('cancel')} className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="edit-member-name" className={labelClass}>{t('full_name')}</label>
            <input id="edit-member-name" type="text" name="name" defaultValue={editingMember.name} required className={fieldClass} />
          </div>

          <div className="min-w-0">
            <label htmlFor="edit-member-role" className={labelClass}>{t('role')}</label>
            <select id="edit-member-role" name="role" defaultValue={editingMember.role} required className={fieldClass} disabled={roles.length === 0}>
              {roles.length === 0 ? <option value="">{t('add_roles_first')}</option> : null}
              {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="edit-member-max-days-off" className={labelClass}>{t('max_days_off')}</label>
            <input id="edit-member-max-days-off" type="number" min="0" max="31" name="maxDaysOff" defaultValue={editingMember.maxDaysOff || ''} className={fieldClass} />
          </div>

          <section className="min-w-0 space-y-3 sm:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">{t('employment_history')}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{t('employment_history_hint')}</p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {t('current_contract')}: {currentPercentage}%
              </span>
            </div>

            <input type="hidden" name="employmentHistory" value={JSON.stringify(employmentHistory)} />

            <div className="space-y-2">
              {employmentHistory.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 items-end gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
                  <div className="min-w-0">
                    <label htmlFor={`employment-effective-from-${index}`} className={labelClass}>{t('effective_from')}</label>
                    <input
                      id={`employment-effective-from-${index}`}
                      type="date"
                      value={entry.effectiveFrom || ''}
                      onChange={event => updateHistoryEntry(index, 'effectiveFrom', event.target.value)}
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor={`employment-percentage-${index}`} className={labelClass}>{t('contract_percentage')}</label>
                    <div className="flex h-10 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                      <input
                        id={`employment-percentage-${index}`}
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={entry.percentage ?? ''}
                        onChange={event => updateHistoryEntry(index, 'percentage', event.target.value)}
                        required
                        className="h-full w-full min-w-0 border-0 bg-transparent px-3 text-sm text-slate-700 focus:outline-none focus:ring-0"
                      />
                      <span className="flex items-center border-l border-slate-200 bg-white px-3 text-sm text-slate-500">%</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHistoryEntry(index)}
                    disabled={employmentHistory.length <= 1}
                    aria-label={t('remove_contract_change')}
                    title={t('remove_contract_change')}
                    className="flex h-10 items-center justify-center rounded-lg px-3 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {historyError ? <p role="alert" className="text-xs font-medium text-red-600">{historyError}</p> : null}

            <button type="button" onClick={addHistoryEntry} className="inline-flex h-9 items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100">
              <Plus className="h-4 w-4" /> {t('add_contract_change')}
            </button>
          </section>

          <div className="min-w-0">
            <label htmlFor="edit-member-birthday" className={labelClass}>{t('birthday')}</label>
            <input id="edit-member-birthday" type="date" name="birthday" defaultValue={editingMember.birthday || ''} className={fieldClass} />
          </div>

          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="edit-member-allocation" className={labelClass}>{t('allocation_option')}</label>
            <select id="edit-member-allocation" name="allocationOption" defaultValue={editingMember.allocationOption || ''} className={fieldClass}>
              <option value="">{t('allocation_none')}</option>
              <option value="1">{t('allocation_option_1')}</option>
              <option value="2">{t('allocation_option_2')}</option>
            </select>
            {editingMember.allocationOption === '1' || editingMember.allocationOption === '2' ? (
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {editingMember.allocationOption === '1' ? t('allocation_option_1_hint') : t('allocation_option_2_hint')}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 pt-2 sm:col-span-2">
            <button type="button" onClick={() => setEditingMember(null)} className="h-10 rounded-lg px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-100">{t('cancel')}</button>
            <button type="submit" className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200">{t('save_changes')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
