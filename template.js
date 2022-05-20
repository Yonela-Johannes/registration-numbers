const registrationTemplate = `
            <div class="container">
                {{#data}}
                    <div class="handlebars-wrapper">
                        <div class="handlebars-head">
                            <h1 class="handlebars-header-title">
                                {{this.registration.header}}
                                
                            </h1>
                        </div>
                    <div class="handlebars-box">
                        <h4 class="handlebars-title">{{this.registration.title}}:</h4>
                        <div class="input-container">
                            <input class="handlebars-reg-input" placeholder="{{this.registration.placeholder}}" type="text" name="text" />
                        </div>
                        <div class="buttons">
                            <div class="button add-number">{{this.registration.addBtn}}</div>
                        </div>
                    </div>
                <!-- town list selection -->
                <div class="handlebars-bottom-box">
                    <h1 class="town-select">
                        Towns
                    </h1>
                    <select type="text" name="name" id="handlebars-regno">
                        <option disabled value="select town" selected>Select Town</option>
                        <option class="town" value="ca">{{this.towns.capetown}}</option>
                        <option class="town" value="cl">{{this.towns.stellenbosch}}</option>
                        <option class="town" value="cy">{{this.towns.bellville}}</option>
                        <option class="town" value="cf">{{this.towns.kuilsriver}}</option>
                        <option class="town" value="cn">{{this.towns.wellington}}</option>
                        <option class="town" value="ck">{{this.towns.malmesbury}}</option>
                        <option class="town" value="cw">{{this.towns.worcester}}</option>
                        <option class="town" value="ct">{{this.towns.ceres}}</option>
                        <option class="town" value="caw">{{this.towns.george}}</option>
                        <option value="refresh">{{this.towns.refresh}}</option>
                    </select>
                    </div>
                <!-- Display town section -->
                <div class="bottom-container">
                    <h1 class="town-name">{{this.registration.townTitle}}</h1>
                    <div class="handlebars-filter-bottom-wrapper">
                        <div class="registration">
                            <div class="number-plate">
                                <span class="filter-plate-inner-box">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-wrapper">
                        <h1 class="town-name display-name"></h1>
                        <div class="buttons reset-button">
                            <div class="button reset-numbers">{{this.registration.clearBtn}}</div>
                        </div>
                        <div class="footer">
                            <span class="handle-total">{{this.registration.total}}<span class="counter"></span></span>
                            <span class="handle-limit">{{this.registration.limit}}</span>
                        </div>
                    </div>
                </div>
                </div>
                    </div>
                {{/data}}
            </div>
`
export { registrationTemplate }