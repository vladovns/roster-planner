# Team Roster Planner — User Manual

## Contents

1. Overview and data storage
2. Roles & Rules
3. Managing shifts
4. Managing team members and contract history
5. Leaves, holidays, and custom events
6. Monthly roster
7. Auto-Scheduler: rules and limitations
8. PDF export and backups
9. Suggested setup workflow
10. Troubleshooting

---

## 1. Overview and data storage

Team Roster Planner is a browser-based tool for preparing monthly team rosters. It supports configurable shift times and staffing targets, role-based assignment rules, dated employment-contract history, leave and custom events, manual roster editing, automatic scheduling, and PDF export.

**Your roster data is stored in the browser's local storage.** It is not automatically synchronized between different browsers or devices. Use **Save Data** regularly to download a JSON backup.

The interface is available in English and German.

### Main tabs

- **Monthly Roster** — view and edit the selected month's schedule.
- **Manage Team** — add, edit, remove, and reorder team members.
- **Manage Shifts** — define shift times, colors, and daily staffing targets.
- **Roles & Rules** — define shift preferences, exclusions, and fixed days off.
- **Leaves & Holidays** — book absences and manage custom events.

The top-right controls include the language selector and the **Save Data** and **Load Data** backup actions.

---

## 2. Roles & Rules

Create roles before adding team members. Every team member must be assigned to a role.

### Create or edit a role

Set a role name and choose its **Priority Target**:

- **Flexible (No Preference)** — the member can be assigned to any shift unless it is excluded.
- **Mainly (Prioritize a shift)** — the selected shift is preferred, but other shifts remain possible when needed. The preference penalty is removed on days when the preferred shift has no staffing demand.
- **Only (Exclusive to one shift)** — the member can only be assigned to the selected shift.

You can also configure:

- **Hard Exclusions** — shifts that members in this role must never be assigned to.
- **Fixed Days Off** — weekdays on which members in this role are always unavailable to the auto-scheduler.

Use the pencil button to edit a role and the trash button to remove it. Renaming a role updates the role name on its team members. Removing a role moves affected members to another remaining role, if one exists.

---

## 3. Managing shifts

Create each shift with:

- **Shift Name** — use a clear name such as B, S1, S2, or S3.
- **Time** — enter the start and end time in `HH:MM - HH:MM` format. Overnight shifts are supported, for example `19:00 - 04:00`.
- **Color** — used to identify the shift in the roster.
- **Staffing Targets** — set the number of people required for each weekday. A target of 0 means that the shift is not required on that weekday.

The application calculates net shift hours after automatic break deductions:

| Raw shift duration | Deduction |
|---|---:|
| More than 5.5 hours | 15 minutes |
| More than 7 hours | 45 minutes |
| More than 9 hours | 1 hour |

Only one applicable deduction is applied. Overnight shift duration is calculated across midnight.

**Shift start times affect the scheduler's coverage choices.** When there are not enough eligible people to cover every active shift, earlier-starting shifts are generally deprioritized so later shifts can be covered. A shift whose name is **S3** receives special priority on Fridays and Saturdays when its staffing target is greater than zero.

Use the pencil button to edit a shift. Use the trash button to delete it; assignments for the deleted shift are also removed, and role preferences or exclusions referring to it are cleaned up.

---

## 4. Managing team members and contract history

### Add a team member

Enter the member's name and select an existing role. The initial employment contract can be selected from the percentage presets or entered as a custom whole-number percentage. Set the date from which that percentage is effective; the default is the current date.

Optional settings:

- **Max Days Off** — the maximum number of rest days used as the full-time baseline for the month. The scheduler scales the implied work target according to the member's monthly contract percentage.
- **Shift Allocation** — controls preferred shift patterns within a work stretch:
  - **Maximize rest between stretches** — prefers later shifts at the start of a work stretch and earlier shifts near its end. The scheduler uses the eligible shifts for that member.
  - **Consistent shifts** — prefers the same shift throughout a work stretch.
- **Birthday** — the birthday is treated as a day off by the auto-scheduler.

### Edit employment contract history

Open **Edit Team Member** to maintain the dated contract history. Keep one entry for each contract change:

1. Enter the date on which the new percentage becomes effective.
2. Select a preset percentage or type a custom whole number from 1 to 100.
3. Add another entry for every later contract change.

Each entry must have a valid, unique effective date. The scheduler applies the percentage that is valid on each calendar day, including when a contract changes during a month.

The scheduler uses contract-adjusted hours and workdays to balance workloads across different employment percentages. **This is a soft balancing preference, not a hard limit on an individual's shifts or hours.** Staffing requirements and eligibility rules can result in actual hours that differ from the proportional target.

Use the pencil button to edit a member. Use the up/down arrows to change the member's display order. Removing a member also removes that member's shift assignments.

---

## 5. Leaves, holidays, and custom events

### Book an absence

In **Leaves & Holidays**, select a team member, absence type, start date, and end date, then click **Book**.

Available types include:

- Holiday
- Sick day
- Wish day
- Unpaid leave
- Custom events that have been created in the Events section

The date-range booking form prevents more than one person from being booked for a holiday on the same date. Sick days, wish days, unpaid leave, and custom events do not have this one-person restriction.

Booked dates are treated as unavailable for shift assignment by the auto-scheduler.

### Create custom events

Expand the **Events** section to create a custom event. Configure its name, abbreviation (up to five characters), hours, color, and optional explanation. You can also choose whether the event **counts as a workday**.

When a custom event is assigned to a member on a date, that member is not available for a shift on that date. If the event is marked as counting as a workday, its configured hours and workday count are included in the Monthly Summary. Otherwise, it is shown as an event day but does not add work hours.

Editing an event updates its definition. Deleting an event also removes existing bookings that refer to that event.

### View bookings by year

The booking list opens on the current calendar year. Use the **Year** selector to view another year that has bookings. A booking spanning New Year's Eve is shown as the relevant part of the date range in each selected year.

Use the trash button beside a booking to remove it.

---

## 6. Monthly roster

### Navigate and read the roster

Use the left and right arrows beside the month name to change the displayed month. Each row represents a team member; each date is a column. The shift legend shows configured shift colors and times.

### Edit a roster cell manually

Click an available cell to select:

- A configured shift
- Rest day (OFF)
- Holiday (HOL)
- Sick day
- Wish day (WSH)
- Unpaid leave
- A configured custom event

Birthdays and role-based fixed days off are locked.

Manual changes are saved automatically in the browser.

### Coverage alerts and monthly summary

The **Coverage Alerts** row identifies days and shifts where the assigned number of people is below the staffing target. A warning such as `S1: 1/2` means one person is assigned where two are required.

The **Monthly Summary** shows each member's worked shifts or workdays, net hours, rest days, and absence counts. Custom events marked as workdays contribute their configured hours and workday count.

Use the month notes area below the roster to save notes for the displayed month.

**Clear Month** removes shift assignments for the currently displayed month only. It does not remove time-off bookings, team members, roles, shifts, or other configuration.

---

## 7. Auto-Scheduler: rules and limitations

Use **Auto-Schedule** to generate the roster for the displayed month.

> **Important:** Auto-Schedule rebuilds the entire displayed month. Existing shift assignments in that month, including manual shift changes, are replaced. Time-off bookings and configuration remain in place. Review the result before relying on it.

The scheduler uses the following rules and preferences:

1. **Rest between shifts:** it checks for at least 11 hours between consecutive shifts.
2. **Consecutive working days:** it normally schedules no more than five consecutive working days. When required coverage cannot otherwise be met, a mandatory rest day can be relaxed as a fallback.
3. **Min 2 Days Off:** when enabled, the scheduler aims for two consecutive rest days between work stretches. Under staffing pressure, the final rest day may be used to fill a required position.
4. **Role rules:** hard exclusions, Only-role restrictions, and fixed days off are respected. Mainly-role preferences are preferences, not exclusive restrictions.
5. **Contract-aware workload balance:** the scheduler uses the contract percentage effective on each date to compare contract-adjusted hours and workdays. This is a soft target and does not cap assignments.
6. **Max Days Off:** the full-time work target implied by this setting is scaled for the member's monthly contract percentage. The scheduler may assign a member to an otherwise unfilled required shift when the limit is at risk; it does not add an extra person to a shift whose target is already met.
7. **Shift coverage:** the scheduler attempts to meet each shift's staffing target. If there are too few eligible people, some positions can remain unfilled and will appear in Coverage Alerts.
8. **Capacity priorities:** when there are not enough eligible people for all active shifts, earlier-starting shifts are generally deprioritized so later shifts can be staffed. S3 is moved to the front of the fill order on Fridays and Saturdays when it has a staffing target.
9. **Work-stretch allocation:** the member's Shift Allocation option influences the preferred shift pattern within a stretch.

The scheduler also considers the end of the previous month when checking a member's consecutive-workday stretch.

### After scheduling

- Review every Coverage Alert.
- Check workdays and net hours in the Monthly Summary, especially for part-time members.
- Review weekends and any shifts with role restrictions.
- Make any necessary manual adjustments.
- Remember that running Auto-Schedule again replaces the month's shift assignments again.

The scheduler is a planning aid. It cannot fill a position when no eligible member is available.

---

## 8. PDF export and backups

### Export PDF

Click **Export PDF** to download a landscape A4 PDF for the currently displayed month. It includes the roster and monthly summary.

### Save and load data

- **Save Data** downloads a JSON backup containing team members and their contract history, roles, shifts, assignments, time-off bookings, custom events, scheduler settings, and monthly notes.
- **Load Data** imports a previously saved JSON backup and restores the data in the application.

All changes are also saved automatically to this browser's local storage. Clearing browser data can erase the roster, and private browsing may not retain it. Keep an external backup.

---

## 9. Suggested setup workflow

1. Create the roles and define their preferences, exclusions, and fixed days off.
2. Create shifts and set the staffing target for each weekday.
3. Add team members, assign roles, set contract percentages and effective dates, and enter birthdays and other options.
4. Create any custom events and book known holidays, absences, and events.
5. Open the required month, set **Min 2 Days Off** as needed, and click **Auto-Schedule**.
6. Review coverage warnings and the monthly summary. Make manual corrections if required.
7. Export a PDF and save a JSON backup.

---

## 10. Troubleshooting

### A shift remains unfilled

Check the staffing target, role exclusions, Only-role restrictions, 11-hour rest requirement, fixed days off, birthdays, and booked absences. If there are not enough eligible people, the scheduler cannot fill every position; review Coverage Alerts.

### Running Auto-Schedule changed my manual assignments

This is expected. Auto-Schedule rebuilds the entire displayed month and replaces its shift assignments. Apply manual changes after the final auto-schedule run.

### A part-time member has more or fewer hours than expected

Contract-aware balancing is a soft preference, not a guaranteed hour cap. Actual coverage needs and the number of shifts each member is eligible to work can affect the result. Check the contract history and effective dates for the month.

### The scheduler uses the wrong contract percentage

Open **Edit Team Member** and check that every contract change has the correct effective date and percentage. Each effective date must be unique.

### Holiday booking reports a conflict

The date-range booking form allows only one holiday booking per date. Check the booking list for the person already booked on the overlapping date.

### I cannot see an older booking

Use the Year selector in **Leaves & Holidays**. The list initially displays the current year and offers other years in which bookings exist.

### Data appears to be missing

Data is stored in the browser's local storage. Check that you are using the same browser and browser profile. Restore a recent JSON backup with **Load Data** if necessary.
