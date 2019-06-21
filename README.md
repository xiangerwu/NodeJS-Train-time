# NodeJS-Train-time
A crawler for new Train timeable by Node JS

主要是為了開發機器人與練習同步所寫

可以查詢未來一個小時內的車次

起點車站與目的車站需更改 index.js (預設是南科到大橋)

- 執行
```
    node ./app.js
```
- 輸出
```
[ { type: '區間3241', set_out: '18:11', arrive: '18:25' },
  { type: '區間3763', set_out: '18:18', arrive: '18:32' },
  { type: '區間3247', set_out: '18:35', arrive: '18:49' } ]
```