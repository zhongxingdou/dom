Dom
======
A tiny and powerful DOM DSL


Fill Form
---------
assume we have a form like below

```html
 <form id="userInfoForm" title="user info form">
        <fieldset>
            <legend>User Info</legend>

            <label for="userName">User Name</label>
            <input id="userName" name="username" type="text" />

            <label for="interest"> Interest </label>
            <input type="checkbox" name="interest" value="0" />
            <label for="write">Painting</label>

            <input type="checkbox" name="interest" value="1" />
            <label for="sing">Singing</label>

            <input type="checkbox" name="interest" value="2" />
            <label for="playgame">Play Game</label>

            <label for="gender"> Gender </label>
            <input type="radio" name="gender" value='1' />
            <label for="man">Male</label>
            <input type="radio" name="gender" value='0' />
            <label for="woman">Female</label>

            <label for="province"> Province </label>
            <select id="province" name="province">
                <option>choose...</option>
                <option value=18>JiangXi</option>
                <option value=21>HuNan</option>
                <option value=5>GuangDong</option>
            </select>

            <label for="intro">Intro</label>
            <textarea id="intro" name="intro"></textarea>

            <input type="hidden" name="token" value="sd#dsf%88SDkx&9" />

            <button>Save</button>
        </fieldset>
    </form>
```

fill form use dom.js

in Dom.js, a label symbol is a string like '@label' start with '@'

```javascript

Dom.fill("@UserName", "Jerry")

Dom.check("@Painting", "#Singing", "#Play Game")

Dom.uncheck("#Singing")

Dom.choose("@Male")

Dom.select("@Province", "GuangDong")

Dom.fill("@Intro", "Hello, I'm Hal Zhong")

```

Selectors
---------

### shorts of general selector 

```javascript

Dom.byId('userInfoForm')

Dom.byCss('#userInfoForm select')

Dom.byClass('product')

Dom.byName('interest')

Dom.byTag('form')

```

### oneByXXX()
return first element against above selector

```javascript

Dom.oneByCss('#productForm .sku')

Dom.oneByTag('form')

Dom.oneByClass('product')

Dom.oneByName('interest')


```

### attribute selector 

```javascript

// <label for="userName">UserName</label> <input id="userName" type="text" />
Dom.byLabel('UserName')
// => <input id="userName" type="text" />

// <option value="086">China</option>
Dom.byText('option', 'China')

// <ul title="shoppingList"></ul>
Dom.byTitle('shoppingList')


```


### Special tag selector

```javascript
Dom.button('@Save')

Dom.fieldset('@User Info')
// find <fieldset> by content text of <legend>

Dom.field('@Singing')
Dom.field('@User Name')

Dom.hidden('token')
// find hidden <input> by it's name


```

### Group elements selector
for checkbox group and radio group

```javascript

Dom.group('@Interest')
// equals to
Dom.group('interest')

```


### selector about table

```javascript

var userTable = Dom.byId("studentsTable")

// get the third row
Dom.row(userTable, 3)

// get rows which index in 3...10
Dom.row(userTable, 3, 10)

// get rows by given condition
Dom.row(userTable, {gender: 'male', score: 'better'})

// get rows by custom filter
Dom.row(userTable, {weight: function(man){ man > 100 } })

// get <td> from ninth cell of eighth row of table
Dom.cell(userTable, 8, 9)
```

Alias
---------
in Dom.js, a Alias is a short name of complex selector express


```javascript

Dom.withIn(aWrap, function(scope, alias){
    alias.set('SaveProdBtn', "#userInfoForm button")
	// equals to
	alias.set({
		'saveProdBtn': '#userInforForm button'
	})

	alias.get('SaveProdBtn')
	// => '#form1 submit'

	alias('SaveProdBtn')
	// equals to
	alias.ref('SaveProdBtn')
	// => <button>

	// remove a short name
	alias.unset('SaveProdBtn')
})

```
