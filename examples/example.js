Dom.withIn(Dom.byId('myForm'), function(myForm, el) {
    // el.set({
        // 'ProvinceSelect': 'select'
    // })
    // console.dir(el('ProvinceSelect'))

    // el.set('ProvinceSelect', '[select]')
    // console.dir(el('ProvinceSelect'))

    // el.set('ProvinceSelect', 'select', true)
    // console.dir(el('ProvinceSelect'))

    Dom.fillIn("@姓名", "Jerry")

    Dom.check("@书法", "@唱歌", "@游戏")
    Dom.uncheck("@书法", "@游戏")

    Dom.choose("@男")

    Dom.select("@户籍省份", "@江西")

    Dom.fillIn("@个人简介", "hello, Dom")
        // debugger

    Dom.fillForm(Dom.getScope(), {
        "@姓名": "Jerry",
        "@兴趣": ["@书法", "@唱歌"],
        "@性别": "@女",
        "@户籍省份": "@湖南",
        "@个人简介": "hello, every one"
    })
    Dom.fillIn("@姓名", "Jerry")

    Dom.check("@书法", "@唱歌", "@游戏")
    Dom.uncheck("@书法", "@游戏")

    Dom.choose("@男")

    Dom.select("@户籍省份", "@江西")

    Dom.fillIn("@个人简介", "hello, Dom")
        // debugger

    Dom.fillForm(Dom.getScope(), {
        "@姓名": "Jerry",
        "@兴趣": ["@书法", "@唱歌"],
        "@性别": "@女",
        "@户籍省份": "@湖南",
        "@个人简介": "hello, every one"
    })

    // debugger
    Dom.setForm(Dom.getScope(), {
        name1: "hal",
        interest: [0, 2],
        gender: 1,
        province: 18,
        intro: 'how are you!'
    })
});