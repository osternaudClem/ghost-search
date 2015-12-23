/**
 * Ghost Search
 * Add a search features on your Ghost theme with the
 * Ghost API.
 *
 * by @osternaud_clem
 * V0.0.1 - December 2015
 */

/**
 * Check if object is part of the DOM
 *
 * @constructor
 * @param {Object} obj element to check
 */
function isDOMElement(obj) {
  return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
}

/**
 * Helper function for extending objects
 */
function extend(object) {
  if (arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }

  var result = object || {},
    key,
    i;

  for (i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};

    for (key in replacement) {
      // Recurse into object except if the object is a DOM element
      if (typeof result[key] === 'object' && !isDOMElement(result[key])) {
        result[key] = extend(result[key], replacement[key]);
      } else {
        result[key] = result[key] || replacement[key];
      }
    }
  }

  return result;
}

/**
 * Get element about is type
 *
 * @param  {string} elem
 * @return {DOM}
 */
function getElement(elem) {
  var domElement = null;
  var prefix = elem[0];
  var suffix = elem.substring(1);

  switch (prefix) {
    case '#':
      domElement = document.getElementById(suffix);
      if (!domElement) {
        throw new Error('The ID "' + suffix + '" does not exist on this page');
      }
      break;
    case '.':
      domElement = document.getElementById(suffix)[0];
      if (!domElement) {
        throw new Error('The Class "' + suffix + '" does not exist on this page');
      }
      break;
    default:
      domElement = elem;
      if (!domElement) {
        throw new Error('The DOM Element "' + elem + '" does not exist on this page');
      }
  }

  return domElement;
}

/**
 * Ghost Search engine
 *
 * @param {obj} options
 */
function GhostSearch(options) {
  options = extend(options, GhostSearch.options);

  this.input = getElement(options.input);
  this.container = getElement(options.container);

  this.atStart     = options.atStart;
  this.classes  = options.classes;
  this.posts    = [];
  this.postsDom = [];
  this.url      = ghost.url.api('posts', {include: 'tags'});

  this.init();
};

GhostSearch.prototype.init = function() {
  var that = this;
  this.input.addEventListener('input', function(e) {
    that._search(e);
  }, false);
  this._createHtml();
};

GhostSearch.prototype._search = function(e) {
  var that = this;
  var terms = e.target.value.toLowerCase();

  if (terms == '') {
    for (var i = 0; i < that.posts.length; i++) {
      that.postsDom[i].style.display = 'none';
    }
  } else {
    for (var i = 0; i < that.posts.length; i++) {
      if (that.posts[i].title.toLowerCase().indexOf(terms) > -1) {
        that.postsDom[i].style.display = 'block';
      } else {
        that.postsDom[i].style.display = 'none';
      }
    }
  }
};

GhostSearch.prototype._createHtml = function() {
  var that = this;
  var searchResultsContainer = this.container;

  var xml = this._loadXml(this.url).then(function(data) {
    that.posts = data.posts;

    for (var i = 0; i < that.posts.length; i++) {
      var post = that.posts[i];

      // Create item div
      var postItem = document.createElement('div');
      postItem.setAttribute('class', that.classes.item);

      // Add header
      var postHeader = document.createElement('header');
      postHeader.setAttribute('class', that.classes.header);

      postItem.appendChild(postHeader);

      // Add title
      var postTitle = document.createElement('h2');
      postTitle.setAttribute('class', that.classes.title);
      postHeader.appendChild(postTitle);

      // Add link
      var postLink = document.createElement('a');
      postLink.setAttribute('href', location.origin + '/' + post.slug);
      postLink.innerHTML = post.title;
      postTitle.appendChild(postLink);

      // Add meta
      var postMeta = document.createElement('section');
      postMeta.setAttribute('class', that.classes.meta);
      postHeader.appendChild(postMeta);

      // Add time
      var postDate = document.createElement('time');
      postDate.setAttribute('class', that.classes.date);
      postDate.innerHTML = that._setDate(post.published_at);
      postMeta.appendChild(postDate);

      // Add tags
      var postTags = document.createElement('div');
      postTags.setAttribute('class', 'post-tags-list');
      that._insertTags(post.tags, postTags);
      postMeta.appendChild(postTags);

      // Add description
      var postExcerpt = document.createElement('section');
      postExcerpt.setAttribute('class', that.classes.desc);
      postItem.appendChild(postExcerpt);

      var postDesc = document.createElement('p');
      if (post.html.length > 150) {
        post.html = post.html.substring(0, 150) + '...';
      }

      postExcerpt.innerHTML = post.html;

      if (that.atStart == 'hide') {
        postItem.style.display = 'none';
      }

      that.postsDom.push(postItem);

      // Add all item into the parent
      searchResultsContainer.appendChild(postItem);
    }
  });
};

GhostSearch.prototype._loadXml = function(url) {
  var req = new XMLHttpRequest();

  promise = new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var posts = JSON.parse(xhttp.responseText);
        resolve(posts);
      }
    };

    xhttp.open('GET', url, true);
    xhttp.send();
  });

  return promise;
};

GhostSearch.prototype._setDate = function(oldDate) {
  var date = new Date(oldDate);

  var months = Array(
    'January,',
    'February,',
    'March,',
    'April,',
    'May,',
    'June,',
    'July,',
    'August,',
    'September,',
    'October,',
    'November,',
    'December,');

  return date.getDate() + ' ' +
  months[date.getMonth()] + ' ' +
  date.getFullYear();
};

GhostSearch.prototype._insertTags = function(tags, parent) {
  var that = this;
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    var postTag = document.createElement('a');
    postTag.setAttribute('href', location.origin + '/tag/' + tag.slug);
    postTag.setAttribute('class', this.classes.tag);
    postTag.innerHTML = tag.name;
    parent.appendChild(postTag);

    if (i < (tags.length - 1)) {
      var tagSeparator = document.createElement('span');
      tagSeparator.innerHTML = ', ';
      parent.appendChild(tagSeparator);
    }
  }
};

GhostSearch.options = {
  input: null,
  container: null,
  atStart: 'show',
  classes: {
    item: 'post-item',
    header: 'post-header',
    title: 'post-tile',
    meta: 'post-meta',
    date: 'post-date',
    tags: 'post-tags-list',
    tag: 'post-tag',
    desc: 'post-excerpt'
  }
};
