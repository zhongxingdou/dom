Dodo
======

principle
----------
+ 不使用缩写
	
	简练你的程序，少输入几个字母并不能代码简单易懂

+ 强调行为
	
	- 避免一连串的对象查找筛选搞晕你的意图
	
	- 更加符合英文文法

+ 把参数加到方法名中只会让api数量增多

+ 针对上条，把使用度最高的参数加入到方法名中
	


Alias
---------

### alias
- $("#form1 submit").alias("保存")
- $("#form1 input[name='name']").alias("姓名")
- $("#news_list").alias("新闻")
- $("#form1 .field").alias("表单控件")

### reference
- button("保存") or element("保存")
- field("姓名") or element("姓名")
- list("新闻") or element(“新闻”)
- all("表单控件") or elements("表单控件")


ClassName
-------
* exception
	- button("保存").hasClass("primary")
	- button("保存").hasClass(["button","primary"])
* set
	- button("保存").setClass("button primary")
	- button("保存").addClass("primary")
	- button("保存").removeClass("primary")
	- button("保存").toggleClass("button")
* get
	- button("保存").className()


Attributes
----------

### attribute
+ exception
	- button("保存").hasAttribute("data-action")
+ get
	- button("保存").attribute("target")
+ set
	- button("保存").setAttribute("target","form1")
+ remove
	- button("保存").removeAttribute("target")
+ disabled
	- disable("保存")
	- enable("保存")

### property
+ set
	- list("新闻列表").setProperty({"innerHTML", "some html…"});
		
+ get
	- list("新闻").property("innerHTML")
	
+ HTML
	- set
		* list("新闻").setHtml("some html…")
	- get
		* list("新闻").html()

### value
+ get
	- field("姓名").value()
+ set	
	- fillIn("姓名", "李雷")
	- check("兴趣","唱歌")
	- uncheck("兴趣","唱歌")
	- unCheckAll("兴趣")
	- select("国家", "英国")
	- selectDefault("国家")
	- submit("form1")

Traversing
----------
+ button("保存").at("#form1 .primary")
+ button("保存").in()
+ button("保存").notIn()
+ button("保存").notAt("#form1 .primary")
+ totalOf("#form input")


	
	
Event
-----

### bind
+ when("click",button("save")).then(handle1).then(obj.do("handle", [param1, param2]));
+ $("xxx").click(validate1)

### unbind
+ stop(validate).when("保存")

### trigger
+ auto("click","保存")









