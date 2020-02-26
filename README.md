A small react app to help plan a release in our version of Agile.

```Which entities do we have?```
1. Group {Name}
2. Team {Name, Parent: group}
3. Release {StartDate, EndDate}
4. Capacity {Parent: Team, Skill, Capacity per week}
5. Epic {Parent: release, Program, SkillSetEffort, Parallel, Priority}
6. Sprint {StartDate, EndDate}
7. Dependency {DependantTeam, BlockingTeam}

----


```Which tables do we have?```
1. Tab1: Groups {Name}
2. Tab1: Teams {Name, Parent: group}
3. Tab1: Releases {StartDate, EndDate}
4. Tab2: several Capacity tables (1 per team) {Parent: Team, dev name, Skill set, Capacity per week}
5. Tab3: Epic {Parent: release, Program, SkillSetEffort (how many devs wit that skill can work on it), Parallel, Priority}
6. Tab4: Planning table (1 per team)

----

```Release planner tasks:```
1. V read on promises
2. V save DB in firebase, update on each change.
3. V	Capacity table: Show an empty table, with names (y axis) and weeks 
4. V Table should be filled with data taken from json ( how should the DB look?)
5. V Table should be editable
6. V Table should write to json after each change
7. V In Capacity table, header should contain start week date, not w<number>.
8. V Planning table: An empty table with  sprints (y axis) and names (x axis)
9. V Data for planning table should be taken from json. 
10. V Epics table: each row is an epic, coloumns are days needed for FE, BE, FS, Core, Element, ALG.
11.	V Data should be served and saved via C# server instead of firebase.
12. V Add a button “re-calculate” to fill planning table.

After showing Mike:
13. in planning tab: color the epics,
14. in planning tab: add number of days for each block,
15. separate names and skillset
16. add bins for each epic+skillset. clicking on block will erase it, increasing it's days in the relevany bin,
17. capacity should be by sprint, not by weeks
18. in planning tab: add lines showing start/end of releases
19. when calculating - think of each block as 80% of 1 week (=4d instead of 5d). 80% should be a variable, allowing to change.
20. join blocks into 1 big polygon, showing epics as bigger blocks. (tetris-like shapes)

