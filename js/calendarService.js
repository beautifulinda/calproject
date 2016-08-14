    (function() {
        'use strict';

        angular.module('icscTutorialCovered', [])
            .service('calService', calService);

        calService.$inject = [];

        /* @ngInject */
        function calService() {
            var dt = moment(); // today

            this.nextMonth = nextMonth;
            this.prevMonth = prevMonth;
            this.init = init;
            this.displayYM = displayYM;

            ////////////////

            function getDate() {
                return dt;
            }

            function displayYM() {
                var localDt = dt.clone(); // 為了顯示的獨立實體
                var display = '';
                
                display = localDt.format('MMM') + ' ' + localDt.format('YYYY');

                return display;
            }

            function init() {
                var weekdays = _.chunk(getCurrentMonth(dt), 7);
                return weekdays;
            }

            function prevMonth() {
                dt.subtract(1, 'months');
                var weekdays = _.chunk(getCurrentMonth(dt), 7);
                return weekdays;
            }

            function nextMonth() {
                dt.add(1, 'months');
                var weekdays = _.chunk(getCurrentMonth(dt), 7);
                return weekdays;
            }

            function getCurrentMonth(dt) {
                var daysInMonth = dt.daysInMonth(),
                    firstDay = moment(dt.format('YYYYMM') + '01', 'YYYYMMDD'),
                    whatDay = firstDay.day(),
                    lastDay = moment(dt.format('YYYYMM') + daysInMonth, 'YYYYMMDD'),
                    whatLastDay = lastDay.day();

                var newArry = _.map(Array.apply(0, Array(daysInMonth)), function(x, idx) {
                    var mObj = moment(dt.format('YYYYMM') + _.padStart(idx + 1, 2, '0'), 'YYYYMMDD');
                    var style = '';

                    if (moment().format('YYYYMMDD') === mObj.format('YYYYMMDD')) {
                        style = 'cal-today';
                    } else if (mObj.day() === 0 || mObj.day() === 6) {
                        style = 'cal-holiday';
                    }
                    return {
                        moment: mObj,
                        css: style,
                        display: mObj.format('D')
                    };
                });
                getPrevMonth(dt, newArry);
                getNextMonth(dt, newArry);
                return newArry;
            };

            function getPrevMonth(dt, newArry) {
                var firstDay = moment(dt.format('YYYYMM') + '01', 'YYYYMMDD'),
                    whatDay = firstDay.day();
                var cloneDt = dt.clone(),
                    prevMonth = cloneDt.subtract(1, 'months'),
                    daysInPreMonth = prevMonth.daysInMonth();

                _.map(Array.apply(0, Array(whatDay)), function(x, idx) {
                    var mObj = moment(prevMonth.format('YYYYMM') + _.padStart(daysInPreMonth - idx, 2, '0'), 'YYYYMMDD');
                    newArry.unshift({
                        moment: mObj,
                        css: 'cal-off',
                        display: mObj.format('D')
                    });
                });
                // return newArry;
            };

            function getNextMonth(dt, newArry) {
                var daysInMonth = dt.daysInMonth(),
                    lastDay = moment(dt.format('YYYYMM') + daysInMonth, 'YYYYMMDD'),
                    whatLastDay = lastDay.day();
                var cloneDt = dt.clone(),
                    nextMonth = cloneDt.add(1, 'months');

                _.map(Array.apply(0, Array(6 - whatLastDay)), function(x, idx) {
                    var mObj = moment(nextMonth.format('YYYYMM') + _.padStart(idx + 1, 2, '0'), 'YYYYMMDD');
                    newArry.push({
                        moment: mObj,
                        css: 'cal-off',
                        display: mObj.format('D')
                    });
                });
                // return newArry;
            };
        }
    })();
