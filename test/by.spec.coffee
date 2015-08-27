describe 'by', ->
  createEl = (tag, id) ->
    el = document.createElement(tag)
    el.id = id if id
    document.body.appendChild(el)
    return el

  removeEl = (el, wrap) ->
    wrap = document.body unless wrap
    wrap.removeChild(el)


  describe 'byId()', ->
    div = null

    before ->
      div = createEl('div', 'id')

    after ->
      removeEl(div)

    it 'normal', ->
      assert Dom.byId('id') == div

  describe 'byTag()', ->
    input1 = null
    input2 = null

    before ->
      input1 = createEl('input')
      input2 = createEl('input')

    after ->
      removeEl(input1)
      removeEl(input2)

    it 'normal', ->
      assert Dom.byTag('input').length == 2

  describe 'oneByTag()', ->
    input1 = null
    input2 = null
    before ->
      input1 = createEl('input')
      input2 = createEl('input')

    after ->
      removeEl(input1)
      removeEl(input2)

    it 'normal', ->
      assert Dom.oneByTag('input') == input1

  describe 'oneByName()', ->
    input = null
    myname = 'myname'
    before ->
      input = createEl('input')
      input.name = myname

    after ->
      removeEl(input)

    it 'normal', ->
      Dom.oneByName(myname) == input

  describe 'byName()', ->
    input1 = input2 = null
    myname = 'myname'
    before ->
      input1 = createEl('input')
      input2 = createEl('input')
      input1.name = input2.name = myname
    after ->
      removeEl(input1)
      removeEl(input2)

    it 'normal', ->
      Dom.byName(myname).length == 2
