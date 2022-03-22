const three = 3;
let $display = $('.display__input');
let total = 0;
let num = 0;

$(document).ready(function () {
  $('input[type=button]').click(function () {
    $display.val($display.val() + $(this).val());
  });

  $('.clear').click(function () {
    total = 0;
    num = 0;
    $display.val('').css({ color: '#000' });
  });

  $('.result').click(function () {
    if ($display.val().includes('/')) {
      operatSplit('/');
      total = parseFloat(num[0]) / parseFloat(num[1]);

      if (total === Infinity) {
        $display.val('ERROR').css({ color: 'red' });
      } else {
        $display.val(total);
        logsShow(total);
      }
    }

    if ($display.val().includes('x')) {
      operatSplit('x');
      total = parseFloat(num[0]) * parseFloat(num[1]);

      $display.val(total);
      logsShow(total);
    }

    if ($display.val().includes('+')) {
      operatSplit('+');
      total = parseFloat(num[0]) + parseFloat(num[1]);

      $display.val(total);
      logsShow(total);
    }

    if ($display.val().includes('-')) {
      operatSplit('-');
      total = parseFloat(num[0]) - parseFloat(num[1]);

      $display.val(total);
      logsShow(total);
    }
  });

  $('.calc_logs').on('scroll', function () {
    console.log('Scroll Top: ', $(this).scrollTop());
  });

  function operatSplit(operat_str) {
    num = $display.val().split(operat_str);

    num[0] = parseFloat(num[0]);
    num[1] = parseFloat(num[1]);
  }

  function logsShow(total) {
    $('.logs__list').prepend(`
      <style>
      .logs__item {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        list-style: none;
      }
      #item__input-check {
        display: none;
      }

      label {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid red;
      }

      #item__input-check:hover + label{
        background-color: red;
      }

      .red + label{
        background-color: red;
      }

      .item__btn-delete {
        font-size: 20px;
        border: none;
        background-color: #fff;
      }

      .item__btn-delete:hover{
        color: red;
      }
      </style>
      
      <li class="logs__item">
      <input type="checkbox" id="item__input-check" onclick="$(this).toggleClass('red')">
          <label for="item__input-check"></label>
          <p class="item__text">${num[0].toFixed(
            three
          )} / ${num[1].toFixed(three)} = ${total.toFixed(three)}</p>
          <button class="item__btn-delete" onclick="$(this).parent().remove()">X</button>
      </li>`);
  }
});
