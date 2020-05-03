# node-schedule-tab

Experimenting with shell support for node support names, like `active`.

Download `schedule.json` and convert to tab separated table:

```sh
node index.js > schedule.tab
```

Determine release streams from `schedule.tab` using node support names:

```sh
./nv active
```

## Questions

Which might be the authoritative reference for questions when we have two files to consult:

- `index.tab` with actual downloadable releases
- `schedule.tab` with streams and dates

When does a stream become active? `index.tab` because a version has to be released.

When does a stream become lts? `index.tab` because a version has to be released (has codename baked in).

When does a stream enter maintenance? `schedule.tab` because does not need a release, date passes.

When does a stream become unsupported? `schedule.tab` because does not need a release, date passes.
