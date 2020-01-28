A small react app to help plan a release in our version of Agile.

Which entities do we have?
Group {Name}
Team {Name, Parent: group}
Resource {Parent: Team, Skill, Capacity}
Release {StartDate, EndDate}
Epic {Parent: release, Program, SkillSetEffort, Parallel, Priority}
Sprint {StartDate, EndDate}
Dependency {DependantTeam, BlockingTeam}





Release planner tasks:
1. V read on promises
2. V save DB in firebase, update on each change.
3. V	Capacity table: Show an empty table, with names (y axis) and weeks 
4. V Table should be filled with data taken from json ( how should the DB look?)
5. V Table should be editable
6. V Table should write to json after each change
7. In Capacity table, header should contain start week date, not w<number>.
8. Planning table: An empty table with with sprints (y axis) and names.
9. Data for planning table should be taken from json. 
10. Epics table: each row is an epic, coloumns are days needed for FE, BE, FS, Core, Element, ALG.
11.	Data should be served and saved via node.js server instead of local json.
12. Add a button “re-calculate” to fill planning table.
