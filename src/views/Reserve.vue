<template>
  <div :class="{'reserve-wrap': true, 'reserve-wrap-seat-view': seatView, 'blue': cinemaSelect && cinemaSelect.name === 'Blue Box' }">
    <div class="reserve" ref="container">
      <div class="room">
        <div class="room-side room-side-front"></div>
        <div class="room-side room-side-back">
          <b-form :class="{ 'room-screen': true, 'reserve-form': true, 'room-screen-big': seatView }" @submit.prevent>
            <!-- <video src="../../public/video/sintel.mp4" autoplay v-if="seatView"></video> -->
            <video src="https://tympanus.net/Development/SeatPreview/media/sintel.mp4" autoplay v-if="seatView"></video>
            <template v-if="!seatView">
              <div class="reserve-header">
                <div class="reserve-title">예약하기</div>
                <b-btn variant="primary" @click.prevent="$router.go(-1)">
                  <span class="fa fa-angle-left"></span>
                  Back
                </b-btn>
              </div>
              <b-row class="reserve-content">
                <b-col cols="4">
                  <el-date-picker class="w-100" v-model="datetime" type="datetime" placeholder="시간과 날짜를 선택" default-time="12:00:00"/>
                  <div class="reserve-movie" v-b-modal.modal_reserve_movie>
                    <div class="card w-100" v-if="movieSelect">
                      <div class="card-inner">
                        <img :src="movieSelect.image" alt="">
                        <div class="card-caption">
                          <h5>{{ movieSelect.title }}</h5>
                        </div>
                      </div>
                    </div>
                    <div class="reserve-movie-empty" v-if="!movieSelect">
                      <div>볼 영화 선택</div>
                      <span class="fa fa-plus"></span>
                    </div>
                  </div>
                  <div class="reserve-cinema" v-b-modal.modal_reserve_cinema>
                    <div class="card w-100" v-if="cinemaSelect">
                      <div class="card-inner">
                        <img :src="cinemaSelect.image" alt="">
                        <div class="card-caption">
                          <h5>{{ cinemaSelect.name }}</h5>
                        </div>
                      </div>
                    </div>
                    <div class="reserve-cinema-empty" v-if="!cinemaSelect">
                      <div>이용할 시네마 선택</div>
                      <span class="fa fa-plus"></span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="8" class="reserve-list">
                  <div :class="{ 'reserve-list-item': true, 'active': listItem === i }" @click="onClickListItem(i)" v-for="i in list" v-if="list">
                    <h5>
                      {{ movieSelect.title }}
                      <small>{{ i.toLocaleString() }}</small>
                    </h5>
                    <p>
                      예약 분류 : 일반예약 | 예약 시네마 : {{ cinemaSelect.name }}
                    </p>
                  </div>
                  <div class="reserve-empty" v-if="!list.length">예매 가능한 시간대가 여기에 표시됩니다.</div>
                </b-col>
              </b-row>
              <div class="reserve-footer">
                <b-btn type="submit" :variant="listItem ? 'primary' : 'disabled'" size="md" :disabled="!listItem" @click="$emit('viewSeats')">좌석 선택하기</b-btn>
              </div>
            </template>
          </b-form>
        </div>
        <div class="room-side room-side-left"></div>
        <div class="room-side room-side-right"></div>
        <div class="room-side room-side-top"></div>
        <div class="room-side room-side-bottom"></div>
        <div class="room-seats">
          <div class="room-seats-row" v-for="j in 16">
            <div class="room-seat" v-for="i in 18"></div>
          </div>
        </div>
      </div>
    </div>
    <transition name="selection">
      <div class="room-select" v-if="seatView">
        <div class="room-select-row" v-for="j in 16">
          <div v-for="i in 18" :class="{ 'room-select-item': true, 'active': contain(j - 1, i - 1) !== false }" @click="$emit('selectItem', j - 1, i - 1)"></div>
        </div>
        <b-btn :variant="seatSelect.length ? 'primary' : 'disabled'" :disabled="!seatSelect.length" @click="reserveComplete">예매하기</b-btn>
        <small class="text-white">* Spacebar로 둘러볼 수 있습니다.</small>
      </div>
    </transition>
    <b-modal id="modal_reserve_movie" ref="modalReserveMovie" size="lg" title="영화 선택하기" centered hide-footer>
      <list-viewer :items="movies" :per-page="4" title="영화 목록" template="movieReserve" :category="{ '제목': 'title' }"/>
    </b-modal>
    <b-modal id="modal_reserve_cinema" ref="modalReserveCinema" size="lg" title="시네마 선택하기" centered hide-footer>
      <list-viewer :items="cinema" :per-page="4" title="시네마 목록" template="cinemaReserve" :category="{ '이름': 'name' }"/>
    </b-modal>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ListViewer from "../components/shared/ListViewer.vue";

    @Component({
      components: {ListViewer}
    })
    export default class Reserve extends Vue {
      private currentUser:object = window.globalData.currentUser;
      private movies:object = window.globalData.movies;
      private cinema:object = window.globalData.cinema;
      private reserves:object = window.globalData.reserves;

      private listItem!:object = null;
      private movieSelect!:object = null;
      private cinemaSelect!:object = null;
      private datetime!:object = null;
      private seatView = false;
      private seatSelect!:object = [];

      created() {
        this.$globalBus.$on('movieSelect', e => {
          this.movieSelect = e;

          try {
            this.$refs.modalReserveMovie.hide();
          } catch(e) {}
        });

        this.$globalBus.$on('cinemaSelect', e => {
          this.cinemaSelect = e;

          try {
            this.$refs.modalReserveCinema.hide();
          } catch(e) {}
        });
      }

      private onClickListItem(idx) {
        this.listItem = idx;
      }

      private reserveComplete() {
        this.reserves.push({
          movie: this.movieSelect,
          cinema: this.cinemaSelect,
          seat: this.seatSelect,
          datetime: this.datetime,
          user: this.currentUser.length ? this.currentUser[0].name : null,

          movieTitle: this.movieSelect.title,
          cinemaName: this.cinemaSelect.name
        });

        this.$router.push('/ticket');
      }

      get list() {
        this.listItem = null;

        if(!this.movieSelect
        || !this.cinemaSelect
        || !this.datetime)
          return [];

        var result = [];

        for(var i = 0; i < 12; i++) {
          if(this.datetime.getHours() <= i * 2)
            result.push(new Date(this.datetime.getFullYear(), this.datetime.getMonth(), this.datetime.getDate(), i * 2, 0, 0));
        }

        return result;
      }

      private contain(row, col) {
        for(var j in this.seatSelect) {
          var select = this.seatSelect[j];

          if(select.row === row && select.col === col)
            return j;
        }

        return false;
      }

      mounted() {
        if(this.$route.params.title) {
          for(var i in this.movies) {
            if(this.movies[i].title === this.$route.params.title) {
              this.movieSelect = this.movies[i];
            }
          }
        }

        var self = this;

        var $container = this.$refs.container,
          $room = $container.querySelector('.room'),
          $rows = [].slice.call($container.querySelectorAll('.room-seats-row')),
          $seats = [].slice.call($container.querySelectorAll('.room-seat')),
          perspective = 2000,
          transEndEventNames = "transitionend webkitTransitionEnd MSTransitionEnd MozTransition",
          tiltRotation = {
            rotateX: 25,
            rotateY: 15
          },
          canTilt = false,
          tilt = false,
          totalRows = $rows.length,
          seatsRow = $rows[0].children.length,
          seatWidth = $seats[0].offsetWidth,
          sideMargin = 4 * seatWidth,
          rowFrontGap = 800,
          rowBack = 100,
          rowGapAmount = 2,
          winSize = {
            width: window.innerWidth,
            height: window.innerHeight
          },
          roomSize = {
            x: seatsRow * seatWidth + sideMargin + rowGapAmount * seatWidth,
            y: 1000,
            z: 3000
          },
          initTransform = {
            translateX: 0,
            translateY: roomSize.y / 3.5,
            translateZ: 0,
            rotateX: -15,
            rotateY: 0
          },
          roomTransform = initTransform;

        function init() {
          scaleRoom();
          applyRoomTransform({ translateX: 0, translateY: 35, translateZ: 1300, rotateX: 0, rotateY: 0 });
          bindEvents();
        }

        init();

        function scaleRoom() {
          var factor = winSize.width / roomSize.x;

          $container.style.transform = 'scale3d(' + factor + ', ' + factor + ', 1)' ;
        }

        function applyRoomTransform(transform) {
          $room.style.transform = 'translate3d(0,0,' + perspective + 'px)'
            +'rotate3d(1,0,0,' + transform.rotateX + 'deg)'
            +'rotate3d(0,1,0,' + transform.rotateY + 'deg)'
            +'translate3d(' + transform.translateX + 'px, ' + transform.translateY + 'px, ' + transform.translateZ + 'px)';
        }

        function applyRoomTransition() {
          $room.style.transition = 'transform 2s ease';
          canTilt = false;
        }

        function removeRoomTransition() {
          $room.style.transition = 'none';
          canTilt = true;
        }

        function bindEvents() {
          window.addEventListener('resize', throttle(function() {
            winSize = {
              width: window.innerWidth,
              height: window.innerHeight
            };

            scaleRoom();
          }, 10), false);

          document.addEventListener('keydown', function(e) {
            if(self.seatView && canTilt && e.keyCode === 32)
              tilt = !tilt
          }, false)

          document.addEventListener('mousemove', function(e) {
            requestAnimationFrame(function() {
              if(!tilt)
                return false;

              var mousePos = getMousePos(e),
                rotX = tiltRotation.rotateX ? roomTransform.rotateX - (2 * tiltRotation.rotateX / winSize.height * mousePos.y - tiltRotation.rotateX) : 0,
                rotY = tiltRotation.rotateY ? roomTransform.rotateY + (2 * tiltRotation.rotateY / winSize.width * mousePos.x - tiltRotation.rotateY) : 0;

              applyRoomTransform({
                translateX: roomTransform.translateX,
                translateY: roomTransform.translateY,
                translateZ: roomTransform.translateZ,
                rotateX: rotX,
                rotateY: rotY
              });
            });
          }, false);
        }

        function previewSeat($seat) {
          tilt = false;

          applyRoomTransition();

          var trans = getComputedStyle($seat.parentElement).getPropertyValue('transform');

          if(trans === 'none') return;

          var values = trans.split('(')[1],
            values = values.split(')')[0],
            values = values.split(','),
            y = values[13],
            z = values[14],
            seatCenterX = $seat.offsetLeft + (sideMargin / 2) + ($seat.offsetWidth / 2),
            tx = seatCenterX < (roomSize.x / 2) ? initTransform.translateX + (roomSize.x / 2 - seatCenterX) : initTransform.translateX - (seatCenterX - roomSize.x / 2),
            ty = roomSize.y / 2 - (roomSize.y - Math.abs(y)) + $seat.offsetHeight + 10,
            tz = Math.abs(z) + 10,
            firstRowZ = roomSize.z - rowFrontGap,
            lastRowZ = firstRowZ - (totalRows - 1 + rowGapAmount) * rowBack,
            minRotY_1 = 0,
            maxRotY_1 = 20,
            initialTranslationX = 0,
            finalTranslationX = roomSize.x / 2,
            rotY_1 = lineEq(minRotY_1, maxRotY_1, initialTranslationX, finalTranslationX, tx),
            minRotY_2 = 0,
            maxRotY_2 = 50,
            rotY_2 = lineEq(minRotY_2, maxRotY_2, initialTranslationX, finalTranslationX, tx),
            rotY = lineEq(rotY_1, rotY_2, lastRowZ, firstRowZ, Math.abs(z));

          roomTransform = {
            translateX: tx,
            translateY: ty,
            translateZ: tz,
            rotateX: 0,
            rotateY: rotY
          }

          applyRoomTransform(roomTransform);

          onEndTransition($room, function() {
            removeRoomTransition();
          });
        }

        function throttle(fn, delay) {
          var allowSample = true;

          return function(e) {
            if(allowSample) {
              allowSample = false;
              setTimeout(function() { allowSample = true }, delay);
              fn(e);
            }
          }
        }

        function onEndTransition($target, callback) {
          var onEndTransitionFn = function(e) {
            $target.removeEventListener('transitionend', onEndTransitionFn, false);
            callback.call(this);
          }
          $target.addEventListener('transitionend', onEndTransitionFn, false);
        }

        function getMousePos(e) {
          var posx = 0,
            posy = 0;

          if(!e) var e = window.event;
          if(e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          } else if(e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          return {
            x: posx,
            y: posy
          };
        }

        function lineEq(y2, y1, x2, x1, currentVal) {
          var m = (y2 - y1) / (x2 - x1),
            b = y1 - m * x1;

          return m * currentVal + b;
        }

        this.$on('viewSeats', function() {
          self.seatView = true;
          applyRoomTransition();
          applyRoomTransform(initTransform);
          onEndTransition($room, function() {
            removeRoomTransition();
          })
        });

        this.$on('selectItem', function(a, b) {
          var contain = this.contain(a, b);
          if(!contain) {
            this.seatSelect.push({
              row: a,
              col: b
            });
          } else {
            this.seatSelect.splice(contain, 1);
          }

          previewSeat($seats[a * seatsRow + b]);
        });
      }
    }
</script>

<style lang="scss" scoped>
  .reserve-wrap {
    height: 100vh;
    overflow: hidden;
    background: #272729;

    &:not(&-seat-view) {
      .reserve {
        transform: none !important;
      }
    }
  }

  .reserve {
    position: relative;
    perspective: 2000px;
    width: 100vw;
    height: 100vh;
  }

  .blue {
    background: #272739 !important;

    .room-side-back,
    .room-side-front {
      background: #232335 !important;
    }

    .room-side-top {
      background: #272739 !important;
    }

    .room-side-left,
    .room-side-right{
      background: #2b2b3d !important;
    }
  }

  .room {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -500px 0 0 -960px;
    width: 1920px;
    height: 1000px;
    transform-style: preserve-3d;

    &-select {
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px;
      z-index: 99;

      &-row {
        display: flex;

        &:nth-child(9) {
          margin-top: 10px;
        }
      }

      &-item {
        width: 10px;
        height: 10px;
        border-radius: 25%;
        background: rgba(72, 72, 78, .5);
        margin: 1px;
        cursor: pointer;

        &.active {
          background: #007bff;
        }

        &:nth-child(9) {
          margin-right: 10px;
        }
      }

      .btn {
        width: 100%;
        margin-top: 10px;
      }

      small {
        margin-top: 10px;
        text-align: center;
        opacity: .5;
        display: block;
      }
    }

    &-side {
      position: absolute;
      display: block;

      &-front,
      &-back{
        width: 1920px;
        height: 1000px;
      }

      &-left,
      &-right {
        background: #2b2b2d;
        width: 3000px;
        height: 1000px;
      }

      &-top,
      &-bottom {
        width: 1902px;
        height: 1000px;
      }

      &-back {
        background: #232325;
        box-shadow: 0 0 0 1px #232325;
        transform: translate3d(0, 0, -3000px);
      }

      &-right {
        right: 0;
        transform: rotate3d(0, 1, 0, -90deg);
        transform-origin: 100% 50%;
      }

      &-left {
        transform: rotate3d(0, 1, 0, 90deg);
        transform-origin: 0 50%;
      }

      &-top {
        background: #272729;
        transform: rotate3d(1, 0, 0, 90deg) translate3d(0, -3000px, 0);
        transform-origin: 50% 0%;
      }
    }

    &-seats {
      position: absolute;
      left: 160px;
      bottom: 0;
      width: calc(100% - 320px);
      height: 113px;
      transform-style: preserve-3d;

      &-row {
        position: absolute;
        display: flex;
        left: 0;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
      }
      @for $i from 0 to 8 {
        &-row:nth-child(#{$i + 1}) {
          transform: translate3d(0, #{$i * -18px}, #{-2200px + ($i * 100px)});
        }
      }
      @for $i from 8 to 16 {
        &-row:nth-child(#{$i + 1}) {
          transform: translate3d(0, #{$i * -18px}, #{-2000px + ($i * 100px)});
        }
      }
    }

    &-seat {
      flex: none;
      height: 100%;
      margin: 0;
      width: 80px;
      background: url(../../public/img/seat.svg) no-repeat 50% 0;
      background-size: 100%;

      &:nth-child(9) {
        margin-right: 160px;
      }
    }

    &-screen {
      position: relative;
      background: #f2f2f2;
      width: 700px;
      height: 700px;
      margin: 100px auto 0;
      overflow: hidden;
      border-radius: 7px;
      transition: width 2s ease,
                  height 2s ease;

      &-big {
        width: 1280px;
        height: 700px;
      }

      h4 {
        font-size: 100px;
        color: white;
      }

      video {
		width: 100%;
		height: 100%;
		background: black;
      }
    }
  }

  .reserve {
    position: relative;

    &-header {
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;

      &-title,
      .btn {
        height: 50px;
        border-radius: 0;
        float: right;
      }

      &:after {
        content: '';
        clear: both;
        display: block;
      }
    }

    &-title {
      display: block;
      line-height: 50px;
      font-size: 18px;
      padding-left: 1rem;
      float: left;
    }

    &-content {
      padding: 0 30px;
    }

    &-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      border-top: 1px solid #ddd;

      .btn {
        float: right;
        height: 50px;
        border-radius: 0;
      }
    }

    &-list {
      background: white;
      min-height: 560px;
      max-height: 560px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: auto;
      cursor: pointer;

      &-item {
        border: 1px solid #ddd;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;

        &.active {
          background: #007bff;
          color: white;
        }

        h5 {
          font-size: 16px;
          font-weight: bold;

          small {
            float: right;
          }
        }

        p {
          margin: 0;
          opacity: .7;
        }
      }
    }

    &-empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #999;
    }

    &-movie,
    &-cinema{
      margin-top: 10px;
      height: 200px;
      display: flex;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #fff;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;

      &-empty {
        font-size: 14px;
        color: #999;
      }
    }

    &-movie,
    &-cinema {
      .card {
        height: 100%;
        border: none;

        &-caption h5 {
          text-align: center;
          padding-top: 12px;
          font-weight: bold;
          font-size: 16px;
        }

        img {
          width: 100%;
          max-height: 250px;
        }
      }
    }

    &-movie {
      height: 300px;
    }

    &-cinema {
      img {
        height: 150px;
      }
    }
  }

  .selection-enter-active, .selection-leave-active {
    transition: right .5s;
  }
  .selection-enter, .selection-leave-to {
    right: -300px;
  }
</style>
<style>
  #modal_reserve_movie .modal-dialog,
  #modal_reserve_cinema .modal-dialog {
    max-width: 1100px;
  }
</style>
