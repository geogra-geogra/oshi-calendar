# 推し乃介

"推し"の"スケ"ジュールを管理できる推し乃介です。

[「球団マスコットの情報。」](https://baseball-mascot.com)を公開するために作成したコードです。

複数の推しのスケジュールをまとめて管理、公開が出来ます。

## データの作り方

1. マスコット自体の情報を data/mascot.json に入力する。
2. 各種 html ファイルを編集する。(index,profile,schedule,aboutus とキャラクター別のページ)
3. マスコットのスケジュールを data/schedule.json に入力する。

私は、Excel で json ファイルのもとを作成、変換して使用しています。(後日公開予定)

### mascot.json

例

> "search": "キャラ A",

> "name": "charaA",

> "full": "キャラクター A",

> "team": "チーム A",

> "url": "https://yahoo.co.jp/",

> "schedule": "",

> "blog": "",

> "Twitter": "",

> "Instagram": "",

> "debut": "2022",

> "no": "1"

**必須の項目**

search: いわゆる「略称」です。スケジュールなどに表示する名前と同じにしてください。

name：「アルファベット表記」です。html ファイルは、${name}.html という形にしてください。

full：「フルネーム」です。

**任意の項目**

team：「フルネーム(チーム名)」といった表示がされます。

url： URL を入力してください。デフォルトでは「公式プロフィール」というテキストで表示されます。

schedule：URL を入力してください。デフォルトでは「公式スケジュール」というテキストで表示されます。

blog：URL を入力してください。デフォルトでは「公式ブログ」というテキストで表示されます。

Twitter：URL を入力してください。デフォルトでは「Twitter」というテキストで表示されます。

Instagram：URL を入力してください。デフォルトでは「Instagram」というテキストで表示されます。

debut：「xxxx 年に登場」と表示されます。

no：「背番号は xx」と表示されます。

### schedule.json

例

> "date": "2023/08/05",

> "title": "中日対ヤクルト@バンテリンドーム 14:00 開始",

> "character": "ドアラ/シャオロン/パオロン/つば九郎",

> "remarks": "マスコット交流",

> "spot": "バンテリンドームナゴヤ",

> "lng": "35.186008",

> "lat": "136.9474",

> "url1": "https://dragons.jp/news/2023/mascot-koryu-swallows.php",

> "url2": "https://www.yakult-swallows.co.jp/news/detail/28567"

**必須の項目**

date：日付 yyyy/mm/dd の形式

title：タイトル

character：data/mascot.json の"search"に登録した名前を用いると、プロフィールページにリンクされます。スラッシュで区切ることで、複数のキャラクターもプロフィールページにリンクができます。

**任意の項目**

remarks：備考です。デフォルトでは赤字で表示されます。

spot：「場所：xxxx」と表示されます。

lng：経度です。

lat：緯度です。※緯度経度にデータがあると、GoogleMap に接続します。

url1：URL を入力してください。url1 が存在する場合、「参考記事」というテキストでリンクが生成されます。

url2：URL を入力してください。先に url1 に入れてください。url2 は「参考記事 2」となります。

### html ファイル

それぞれ編集が可能です。

### 画像

img ディレクトリに、mascot.json の"name"と同じ名前の jpg ファイルを入れることで、各キャラクターのプロフィールページに画像が表示できます。

### ライセンス

Copyright (c) 2023 geogra-geogra

Released under the MIT license

https://opensource.org/licenses/mit-license.php
