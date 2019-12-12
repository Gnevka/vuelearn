<template>
    <section>
        <div class="container">
            <div>
                <div v-if="!gameIsRunning">
                    Сhoose name: 
                    <input type="text"  v-model="name">
                </div>
                <h2>Coins: {{ coins }}</h2>
                <h2>Elixirs: {{ eliks }}</h2> 
            </div>
            <section class="row">
                <div class="col-6">
                    <div class="col-6">
                        <h1 class="text-center"> Level {{playerlvl}} </h1>
                        <div class="progressbar">
                            <div 
                                class="progressbar text-center" 
                                style="background-color: blue; margin: 0; color: black;"
                                :style="{width: progresslvl + '%'}">
                                {{progresslvl}}
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h1 class="text-center"> Charge </h1>
                        <div class="progressbar">
                            <div 
                                class="progressbar text-center" 
                                style="background-color: yellow; margin: 0; color: black;"
                                :style="{width: playerCharge + '%'}">
                                {{playerCharge}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div>{{ randomPic.namePic }}</div>
                    <img v-bind:src="randomPic.image    ">
                </div>   
            </section>
            <hr>
            <section class="row">
                <div class="col-6">
                    <h1 class="text-center"> {{ name }}'s HP </h1>
                    <div class="healthbar">
                        <div 
                            class="healthbar text-center" 
                            style="background-color: green; margin: 0; color: white;"
                            :style="{width: playerHealthPercent + '%'}">
                            {{playerHealth}}
                        </div>
                    </div>
                    <div class="col-12">
                        Damage: {{ playerDamage.min }} - {{playerDamage.max}}
                    </div>
                    <div class="col-12">
                        Special damage: {{ playerSpecialDamage.min }} - {{playerSpecialDamage.max}}
                    </div>
                    <div class="col-12">
                        Heal: {{ maxHeal }}
                    </div>
                </div> 
                <div class="col-6">
                    <h1 class="text-center">Monster's HP</h1>
                    <div class="healthbar">
                        <div 
                            class="healthbar text-center" 
                            style="background-color: green; margin: 0; color: white;"
                            :style="{width: monsterHealthPercent + '%'}">
                            {{monsterHealth}}
                        </div>
                         </div>
                    <div class="col-12">
                        Damage: {{ monsterDamage.min }} - {{monsterDamage.max}}
                    
                    </div>
                </div>
            </section>
            <hr/>
            <section class="row controls" v-if="!gameIsRunning">
                <div class="col-12">
                    <button class="btn btn-info" @click="startGame"> Start New Game</button>
                </div>
            </section>
            <section class="row controls" v-else>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-1">
                         <button class="btn btn-danger" @click="attack">Attack</button>
                    </div>
                    <div class="col-lg-2"> 
                        <button class="btn btn-warning" :disabled="!specialAttackEnable" @click="specialAttack">Special Attack</button>
                    </div>
                    <div class="col-lg-1">
                        <button class="btn btn-success" :disabled="!healEnable" @click="heal">HEAL</button>
                    </div>
                    <div class="col-lg-1">
                        <button class="btn btn-success" :disabled="!useElixEnable" @click="useElix">Use Elixir</button>
                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-secondary" @click="giveUp">GIVE UP</button>
                    </div>
                    <div class="col-lg-1">
                    </div>
                    <div>
                        <div class="col-lg-1"  >
                            <button class="btn btn-secondary" @click="BuyElix"  >Buy Elixir</button>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-1" v-if="!specialAttackIsBuying">
                            <button class="btn btn-secondary" :disabled="!buttonBSAEnable" @click="BuySA" >Buy Special Attack</button>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-1"  v-if="!healIsBuying">
                            <button class="btn btn-secondary"  @click="BuyH" >Buy Heal</button>
                    </div>
                    </div>
            </section>
            <hr>
            <section class="list-group-item list-group-item-light">
                <div class="small=12 columns">
                    <ul>
                        <li v-for="(turn, idx) in turns" :key="idx"
                            :class="{'list-group-item list-group-item-success': turn.isPlayer, 'list-group-item list-group-item-danger': !turn.isPlayer}">
                            {{ turn.text }}
                        </li>  
                    </ul>
                </div>
            </section>
        </div>    
    </section>    
</template>>
<script>
export default {
    name: 'home',
    data() {
        return {
            healBuy: false,
            specialAttackIsBuying: false,
            healIsBuying: false,
            playerHealth: 100,
            monsterHealth: 100,
            gameIsRunning: false,
            turns: [],
            coins: 0,
            playerCharge: 0,
            playerlvl: 1,
            progresslvl: 0,
            eliks: 1,
            name: '',
            randomPic: null,
            pic: [
                {
                    namePic: 'q',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMamq8mLZ6sy7R4X-OsxoACfg_5k0HjZaw1wYIesGpzlKFgsQI&s'
                },
                {
                    namePic: 'w',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFG6zfZIcRmPyLEh0TFninP2vKk2pJjh509KoUPARGL_BxSzB&s'
                },
                {
                    namePic: 'e',
                    image: 'https://thumbs.gfycat.com/TinyInsidiousFrogmouth.webp'
                },
                {
                    namePic: 'r',
                    image: 'https://owips.com/sites/default/files/clipart/maze-clipart/280173/maze-clipart-pixel-art-280173-6205150.png'
                },
                {
                    namePic: 't',
                    image: 'http://files.softicons.com/download/animal-icons/monster-icons-by-spoongraphics/png/256x256/Orange-Monster.png'
                },
            ]
        }
    },
    computed:{
        useElixEnable() {
            if (this.eliks >= 1) {
                return true
            }
            return false
        },
        healEnable () {
            if (this.healIsBuying && this.playerCharge >= 20) {
                return true
            }
            return false
        },
        specialAttackEnable() {
            if (this.specialAttackIsBuying && this.playerCharge > 30) {
                return true
            }
            return false
        },
        playerHealthPercent () {
            return this.playerHealth / this.maxHealth *100
        },
         monsterHealthPercent () {
            return this.monsterHealth / this.maxHealth *100
        },
        playerDamage() {
            const min = 10
            return {min: min * this.playerlvl, max:  min * this.playerlvl * 1.5}
        },
        playerSpecialDamage() {
            var pd = this.playerDamage
            return {min: pd.min * 1.5, max:  pd.max * 1.5}
        },
        monsterDamage() {
            const min = 11
            return {min: min * this.playerlvl, max:  min * this.playerlvl * 1.5}
        },
        maxHealth () {
            return 100 * this.playerlvl
        },
        maxHeal () {
            return 30 * this.playerlvl
        },
         buttonBSAEnable() {
            if (this.specialAttackIsBuying) {
                return false
                }
                return true
        }, 
        buttonHealEnable  () {
            if (this.healIsBuying) {
                return false
                }
                return true
        }
    },
    methods: {
        startGame () {
            this.gameIsRunning = true;
            this.playerHealth = this.maxHealth;
            this.monsterHealth = this.maxHealth;
            this.turns = [];  
            this.random()
        },
        random() {
            var rand = Math.floor(Math.random() * this.pic.length);
            this.randomPic = this.pic[rand];
        },    
        attack () {
            var damage =this.calculateDamage(this.playerDamage);
            this.monsterHealth -= damage;      
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits for monster' + damage
            });      
            if(this.checkWin()) {
                return;
            }
            this.monsterAttack();
            var sa = this.calculateCharge(10,12)
            this.playerCharge += sa;
            this.charge();
            
        },
        specialAttack () {
            var damage = this.calculateDamage(this.playerSpecialDamage);
            this.monsterHealth -= damage
            this.playerCharge -= 30
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster  Hard for ' + damage
            });  
            if(this.checkWin()){
                return;            
            }
            this.monsterAttack();
        },
        heal () {
            if (this.playerHealth <= (this.maxHealth-this.maxHeal) ) {
                this.playerHealth += this.maxHeal;
            } else {
                this.playerHealth = this.maxHealth;
            }
            this.playerCharge -= 20
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for' + this.maxHeal
            });
            this.monsterAttack();
        },
        charge() {
            if(this.playerCharge <= 90) {
                this.playerCharge += 1;
            } else {
                this.playerCharge = 100;
            }
        },
        giveUp () {
            this.gameIsRunning=false;
            this.coins -= 500;
            this.turns.unshift({
                isPlayer: false,
                text: 'Сoins - 500' 
            })
            this.playerCharge = 0;
            this.playerlvl = 1;
            this.progresslvl = 0;
            this.playerHealth = this.maxHealth;
            this.random();
        },
        monsterAttack () {
            var damage = this.calculateDamage(this.monsterDamage);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false, 
                text: 'Monster hits for player ' + damage
            })
        },
        calculateDamage (damage) {
            return Math.max(Math.floor(Math.random() * damage.max)+ 1, damage.min)
        }, 
        calculateCharge (min, max) {
            return Math.max(Math.floor(Math.random() * max)+ 1, min)
        },
        BuySA () {
            if (this.coins >= 50) {
                this.coins -= 50;
                this.specialAttackIsBuying = true
                this.specialAttackEnable()
                this.buttonBSAEnable = true
            }      
        },
        BuyH () {
            if (this.coins >= 50) {
                this.coins -= 50;
                this.healIsBuying = true
                this.healEnable()
                this.buttonHealEnable = true
            }
        } ,
        BuyElix() {
            if(this.coins >= 100) {
            this.eliks += 1
            this.coins -= 100}
        },
        useElix() {
            if(this.eliks >= 1){
                if (this.playerHealth <= (this.maxHealth-100)) {
                    this.playerHealth += 100
                } else {
                    this.playerHealth = this.maxHealth
                }
                this.eliks -= 1;
            }
        },
        checkWin () { 
            if (this.monsterHealth <= 0) {
                if (confirm ('You winner! New game?')) {

                        this.coins += 100;
                        this.progresslvl += 50;
                        if  (this.progresslvl >= 100) {
                            this.playerlvl += 1;
                            this.progresslvl = 0;
                        }
                        this.startGame ();
                        this.turns.unshift({
                isPlayer: true,
                text: 'Coins + 100'
            });
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0){
                if (confirm('You lose! New game?')) {
                    this.startGame ();
                    this.coins -= 50;
                    this.turns.unshift({
                isPlayer: false,
                text: 'Coins -50'
                
            });
                    
                }else {
                    this.gameIsRunning =false;
                }
                return true;    
            }
            return false;
            
        }
    },
    created(){
        this.random()
    }
};

</script>
<style scoped>
    .text-center {
    text-align: center;
}
.progressbar {
    width: 80%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 500ms;
}

.healthbar {
    width: 80%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 500ms;
}

.control, .log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
}

.turn {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
}

.log ul {
    list-style: none;
    font-weight: bold;
    text-transform: uppercase;
}

.log ul li {
    margin: 5px;
}

.log ul .player-turn {
    color: blue;
    background-color: #e4e8ff;
}

.log ul .monster-turn {
    color: red;
    background-color: #ffc0c1;
}

</style>