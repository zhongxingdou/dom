describe 'util', ->
  describe 'each()', ->
    it 'call handler with each item', ->
      count = 0
      Dom.each [1,2,3], (n, i) ->
        count += n

      assert count == 1 + 2 + 3

    it 'break if handler returns false', ->
      count = 0
      Dom.each [1,2,3], (n, i) ->
        count += n
        false if n == 2

      assert count == 1 + 2
