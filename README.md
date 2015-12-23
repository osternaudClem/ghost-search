# Ghost Search
**GhostSearch** is a Javascript plugin to add ghost search in your theme.

**GhostSearch** is using the Ghost API include in the 0.7.2 version.

## Turn on API
First of all, you must enable the public API in your admin.

Go to "Labs", scroll down and check the "Public API".

![Enable Api](/images/enable-api.png)

## Get the code

You have two way to get the code.

### Via Bower
```shell
bower install ghost-search --save
```

Insert the javascript file in your ```default.hbs```.
```html
<script type="text/javascript" src="bower_components/ghost-search/ghost-search.js"></script>
```

or the minify version

```html
<script type="text/javascript" src="bower_components/ghost-search/ghost-search.min.js"></script>
```

### Via download
You can directly download the repo.

## Use it
To use it, you must call the GhostSearch functions.

```javascript
var sg = new GhostSearch({
  input: '#search',
  container: '#search-results',
  atStart: 'hide'
});
```

## Options
### Input
**input** can be three different things:
- A string who start by ```#```. The plugin will looking for a DOM element with this ID

- A string who start by ```.```. The plugin will looking for a DOM element with this class. If several class in the dom are found, the first is used.

- A DOM element.

#### Example
With **ID**:
```js
var sg = new GhostSearch({
  input: '#search-input'
});
```

With **Class**:
```js
var sg = new GhostSearch({
  input: '.search-input'
});
```

With **DOM** element:
```js
var searchInput = document.getElementById('search-input');
var sg = new GhostSearch({
  input: searchInput
});
```

### Container
**container** means the ```div``` where the results will appear.

**container** allow the same parameters as the **input** option.

#### Example
With **ID**:
```js
var sg = new GhostSearch({
  container: '#search-results'
});
```

With **Class**:
```js
var sg = new GhostSearch({
  container: '.search-results'
});
```

With **DOM** element:
```js
var searchInput = document.getElementById('search-results');
var sg = new GhostSearch({
  container: searchInput
});
```

### AtStart
**atStart** is use to tell if the results is shown at the loading or not.

**atStart** allow two value: ```show``` or ```hide```.

The default value is ```show```.

### Classes
**classes** is an object where every needed class are define.

| Name | Default | Role |
| :------------- | :------------- |
| item | ```post-item``` | This class wrap a search item |
| header | ```post-header``` | This class wrap the header item. The header contains the **title** and the **meta** |
| title | ```post-title``` | This class wrap the **title** |
| meta | ```post-meta``` | This class wrap the **date** and **tags** |
| date | ```post-date``` | This class wrap the **date** |
| tags | ```post-tags``` | This class wrap the **tags list** |
| tag | ```post-tag``` | This class wrap a **tag** |
| desc | ```post-desc``` | This class wrap the **excerpt** |

If you using the default class, this is a HTML render:
```html
<div class="post-item" style="display: block;">
  <header class="post-header">
    <h2 class="post-tile">
      <a href="http://localhost:2368/slush-2">Slush Gulpfile Front</a>
    </h2>

    <section class="post-meta">
      <time class="post-date">9 December, 2015</time>
      <div class="post-tags-list">
        <a href="http://localhost:2368/tag/workflow" class="post-tag">workflow</a>
        <span>, </span>
        <a href="http://localhost:2368/tag/gulp" class="post-tag">gulp</a>
        <span>, </span>
        <a href="http://localhost:2368/tag/slush" class="post-tag">slush</a>
      </div>
    </section>
  </header>

  <section class="post-excerpt">
    <p>Today, I use a lot <strong>gulp</strong> in my workflow and I want to share with you my Slush generator. <br>
Before that, let me show you what m...</p>
  </section>
</div>
```

## TO-DO
- Add custom templating

## License
The MIT License (MIT)

Copyright (c) 2015 Vipul Asri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
