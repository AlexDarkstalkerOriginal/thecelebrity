var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");   
var nebPay = new NebPay();
var dappAddress = "n1kx1he9LcvbyvTvFdENMmWDtXg5MVfxwQ4";

// онлоад
  window.onload = function(){         
    if(typeof(webExtensionWallet) === "undefined"){     
          $(".noExtension").show();   
          $(".content").hide();
      }else{          
      }
  };  
// онлоад

var hash_value = '';

var vm = new Vue({
  el: '.app',
  data: {      
    market: false,
    lab: true,    
    battleground: false,
    rank: false,
    lab_monsters: true,
    lab_gift: false,
    congrat: false, 
    versus: false,
    lab_nav: true,
    monster_page: false,
    no_monsters: false,        
    monsters_battle: [],
    my_monsters: [],    
    monsters_market: [],          
    new_market: [],
    id_monster: 0,    
    can_vote: true,
  },
   methods: {
    buy: function (id, price) {
      vm.id_monster = id;
      var to = dappAddress;      
      var value = price;
      var callFunction = 'buyCelebrity';    
      var id_this = vm.id_monster;
      var args = [];
      args.push(id_this);          
      var callArgs = JSON.stringify(args);    
      nebPay.call(to, value, callFunction, callArgs, { 
        listener: cbTransactionBuy              
      });        
    },
    vote: function (id) {
      vm.id_monster = id;
      var to = dappAddress;      
      var value = 0;
      var callFunction = 'createVote2';    
      var id_this = vm.id_monster;
      var args = [];
      args.push(id_this);          
      var callArgs = JSON.stringify(args);    
      nebPay.call(to, value, callFunction, callArgs, { 
        listener: cbTransactionVote         
      });
    }
  }
})  

// маркет
    Vue.component('monster-market', {
    props: ['name', 'price', 'owner', 'src', 'id'],
    template: `<div class="monster">\
                <h3>{{name}}</h3>\
                <img v-bind:src="src" alt="">
                <span class="prize">{{price}}</span>\                
                <span class="owner">owner <span class="value">{{owner}}</span></span>\                
                <button class="buy" v-on:click="vm.buy(id, price)">Buy</button>\
              </div>`,
    })
// маркет

// мои себы
  Vue.component('my-monster-lab', {
    props: ['name', 'price', 'owner', 'src', 'id'],
    template: `<div class="monster">\
                <h3>{{name}}</h3>\
                <img v-bind:src="src" alt="">
                <span class="prize">{{price}}</span>\                
                <span class="owner">owner <span class="value">{{owner}}</span></span>\                                
              </div>`,
  })
// мои себы

// голосовалка
  Vue.component('monster-bg', {
    props: ['price','name', 'owner', 'id', 'src', 'votes'],
    template: `<div class="monster">\
                <h3>{{name}}</h3>\
                <img v-bind:src="src" alt="">                
                <span class="prize">{{votes}} votes</span>\                
                <button v-if="vm.can_vote" v-on:click="vm.vote(id)" class="attack">Vote</button><button v-else class="freeze">Voted</button>\
              </div>`,              
  })
// голосовалка

// переключение табов
  $('.nav button').click(function(){

    if ($(this).hasClass('market')) {
        vm.market = true;      
        vm.lab = false;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('lab')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = true;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('battleground')) {
        vm.market = false;      
        vm.lab = false;
        vm.battleground = true;
        vm.rank = false;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('rank')) {
        vm.market = false;      
        vm.lab = false;
        vm.battleground = false;
        vm.rank = true;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    }

    $('.lab_nav').hide();
    
    if ($(this).hasClass('lab')) {
      $('.lab_nav').show();
    };

    if ($(this).hasClass('active')) {
      return false;
    };    

    $('.nav button').removeClass('active');
    $(this).addClass('active');
  })


  $('.lab_nav button').click(function(){

    if ($(this).hasClass('lab_monsters')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = true;
        vm.lab_gift = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('lab_gift')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = false;
        vm.lab_gift = true;
        vm.no_monsters = false;
        vm.congrat = false;
      };
    if ($(this).hasClass('active')) {
      return false;
    }
    $('.lab_nav button').removeClass('active');
    $(this).addClass('active');
  })
// переключение табов

// попапы
  $('.popup').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   

  $('.transaction').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   
// попапы

// гет магазин
  $('.market').click(function(){
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getCelebrity';
      var callArgs = "[]";    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbMarketMonsters              
      });    
  })

  function cbMarketMonsters(resp) {
    var market_monsters = JSON.parse(resp.result);              
      vm.new_market = [];
      $.each(market_monsters,function(index,value){                            
        var new_prize = market_monsters[index].price/1000000000000000000;
        market_monsters[index].price = new_prize;        
        var el_for_push = {
                            name: market_monsters[index].name,
                            owner: market_monsters[index].owner,
                            price: market_monsters[index].price,
                            src: 'https://alexdarkstalkeroriginal.github.io/thecelebrity/img/' + market_monsters[index].name + '.png',
                            id: index,
                          };               
        vm.new_market.push(el_for_push);
      });      
  }
// гет магазин

// гет мои монстров + монстров под бой
  $(document).ready(function(){    
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getMyCelebrities';
      var callArgs = "[]";    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbMyMonsters              
      });    
  })

  $('.lab').click(function(){
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getMyCelebrities';
      var callArgs = "[]";    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbMyMonsters              
      });    
  })

  function cbMyMonsters(resp) {                
    if (resp.result == '[]') {          
      vm.market = false;      
      vm.lab = false;
      vm.battleground = false;
      vm.rank = false;
      vm.lab_nav = true;
      vm.lab_monsters = false;
      vm.lab_gift = false;
      vm.no_monsters = true;            
    } else { 
      var mymonsters_arr = JSON.parse(resp.result);
      vm.my_monsters = [];
      $.each(mymonsters_arr,function(index,value){                            
        var new_prize = mymonsters_arr[index].price/1000000000000000000;
        mymonsters_arr[index].price = new_prize;        
        var el_for_push = {
                            name: mymonsters_arr[index].name,
                            owner: mymonsters_arr[index].owner,
                            price: mymonsters_arr[index].price,
                            src: 'https://alexdarkstalkeroriginal.github.io/thecelebrity/img/' + mymonsters_arr[index].name + '.png',
                            id: index,
                          };               
        vm.my_monsters.push(el_for_push);        
      });
    }
  }
// гет мои монстров + монстров под бой

// обработчик транзакции на покупку
  function cbTransactionBuy(resp) {
    hash_value = resp.txhash;    
    if (resp.txhash == undefined) {
    } else {
      $('.transaction').trigger('click');
      $('.hash').html('txHash: <p>' + hash_value + '</p>');
    } 
    var reload_trans = setInterval(function(){
      neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
        result_trans = receipt.status;        
        if (result_trans == 1) {
          $('#transaction .status_trans').html('<p style="color: green"> sucess </p>');                                  
          setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);                            
          $('.market').trigger('click');
          clearInterval(reload_trans);                          
        } else if (result_trans == 2) {
          $('#transaction .status_trans').html('<p style="color: orange"> pending </p>');
        } else {
          $('#transaction .status_trans').html('<p style="color: red"> fail </p>');                        
          setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);          
          clearInterval(reload_trans);          
        }
    })}, 1000);  
  }    
// обработчик транзакции на покупку

// гет поле боя
    $('.battleground').click(function(){
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getCelebrityVote';
      var args = [];
      var callArgs = JSON.stringify(args);
      nebPay.simulateCall(to, value, callFunction, callArgs, {
        listener: cbBattleList
      });

      var to = dappAddress;      
      var value = 0;
      var callFunction = 'createVote2';
      var id_this = 0;
      var args = [];
      args.push(id_this);
      var callArgs = JSON.stringify(args);    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbTransactionVoteSimulate
      });
    })

    function cbBattleList(resp) {
        vm.monsters_battle = [];
       if (resp.result == '[]') {
        $('.no_votes').show();
        $('.no_votes h3').html('While there is no vote to add a new card. It will soon appear');
      } else {
        var mymonsters_arr = JSON.parse(resp.result);        
        vm.monsters_battle = [];
        $.each(mymonsters_arr,function(index,value){
          var new_prize = mymonsters_arr[index].price/1000000000000000000;
          mymonsters_arr[index].price = new_prize;
          var el_for_push = {
                              name: mymonsters_arr[index].name,
                              owner: mymonsters_arr[index].owner,
                              price: mymonsters_arr[index].price,
                              votes: mymonsters_arr[index].votes,
                              src: 'https://alexdarkstalkeroriginal.github.io/thecelebrity/img/' + mymonsters_arr[index].name + '.png',
                              id: index,
                            };
          vm.monsters_battle.push(el_for_push);
        });
      }
    }
// гет поле боя

// обработчик голосов
  function cbTransactionVoteSimulate(resp) {
    console.log('vote ' + JSON.stringify(resp));
    if (resp.result == "Error: You already chose") {
      vm.can_vote = false;
    } else {}
  }
  function cbTransactionVote(resp) {    
    hash_value = resp.txhash;    
    if (resp.txhash == undefined) {
    } else {
      $('.transaction').trigger('click');
      $('.hash').html('txHash: <p>' + hash_value + '</p>');
    } 
    var reload_trans = setInterval(function(){
      neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
        result_trans = receipt.status;        
        if (result_trans == 1) {
          $('#transaction .status_trans').html('<p style="color: green"> sucess </p>');                                  
          setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);                            
          $('.battleground').trigger('click');
          clearInterval(reload_trans);                          
        } else if (result_trans == 2) {
          $('#transaction .status_trans').html('<p style="color: orange"> pending </p>');
        } else {
          $('#transaction .status_trans').html('<p style="color: red"> fail </p>');                        
          setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);          
          clearInterval(reload_trans);          
        }
    })}, 1000);  
  }
// обработчик голосов 