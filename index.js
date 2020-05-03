const https = require('https');

// 'v0.12': { start: '2015-02-06', end: '2016-12-31' },
//
// start: '2016-04-26',
// lts: '2016-10-18',
// maintenance: '2018-04-30',
// end: '2019-04-30',
// codename: 'Boron'
const scheduleUrl = 'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json';


function transform(scheduleJson) {
  const versionsUnsorted = Object.keys(scheduleJson);
  // Sort into most recent first (effectively highest version), like index.tab in downloads
  const versions = versionsUnsorted.sort((left, right) => {
    const leftStart = scheduleJson[left];
    const rightStart = scheduleJson[right];
    if (leftStart < rightStart)
      return 1;
    if (leftStart === rightStart)
      return 0;
    return -1;
  });

  const fields = ['start', 'lts', 'maintenance', 'end', 'codename'];
  console.log(`version\t${fields.join('\t')}`);
  versions.forEach((version) => {
    const details = scheduleJson[version];
    const values = [version];
    fields.forEach(field => values.push(details[field] || ''));
    console.log(values.join('\t'));
  });
}

https.get(scheduleUrl, res => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', data => {
    body += data;
  });
  res.on('end', () => {
    body = JSON.parse(body);
    transform(body);
  });
});
