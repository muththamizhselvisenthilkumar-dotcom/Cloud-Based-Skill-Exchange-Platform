// Load saved data

let skills =
    JSON.parse(
        localStorage.getItem("skillCloudData")
    ) || [];

let exchanges =
    JSON.parse(
        localStorage.getItem("skillCloudExchanges")
    ) || [];


// ADD SKILL

function addSkill() {

    const name =
        document
        .getElementById("name")
        .value.trim();


    const teachSkill =
        document
        .getElementById("teachSkill")
        .value.trim();


    const learnSkill =
        document
        .getElementById("learnSkill")
        .value.trim();


    const level =
        document
        .getElementById("level")
        .value;


    const description =
        document
        .getElementById("description")
        .value.trim();


    // Validation

    if (
        name === "" ||
        teachSkill === "" ||
        learnSkill === "" ||
        description === ""
    ) {

        alert(
            "Please fill all the fields!"
        );

        return;

    }


    // Create skill

    const skill = {

        id: Date.now(),

        name: name,

        teachSkill: teachSkill,

        learnSkill: learnSkill,

        level: level,

        description: description

    };


    skills.push(skill);


    saveData();


    // Clear form

    document.getElementById(
        "name"
    ).value = "";


    document.getElementById(
        "teachSkill"
    ).value = "";


    document.getElementById(
        "learnSkill"
    ).value = "";


    document.getElementById(
        "level"
    ).value = "Intermediate";


    document.getElementById(
        "description"
    ).value = "";


    alert(
        "Your skill has been added successfully! ☁️"
    );


    displaySkills();

}


// DISPLAY SKILLS

function displaySkills() {

    const skillList =
        document.getElementById(
            "skillList"
        );


    const searchText =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    skillList.innerHTML = "";


    const filteredSkills =
        skills.filter(skill =>

            skill.name
                .toLowerCase()
                .includes(searchText)

            ||

            skill.teachSkill
                .toLowerCase()
                .includes(searchText)

            ||

            skill.learnSkill
                .toLowerCase()
                .includes(searchText)

        );


    if (
        filteredSkills.length === 0
    ) {

        skillList.innerHTML = `

            <div class="empty">

                📭 No skills found.

                <br><br>

                Add the first skill above!

            </div>

        `;

        updateStats();

        return;

    }


    filteredSkills.forEach(skill => {

        const card =
            document.createElement("div");


        card.className =
            "skill-card";


        card.innerHTML = `

            <div class="skill-name">

                💡 ${skill.teachSkill}

            </div>


            <div class="member">

                👤 ${skill.name}

            </div>


            <div class="skill-info">

                ${skill.description}

            </div>


            <span class="skill-badge">

                ${skill.level}

            </span>


            <div class="learn-box">

                📚 Wants to learn:
                <strong>
                    ${skill.learnSkill}
                </strong>

            </div>


            <div class="card-buttons">

                <button
                    class="exchange-btn"
                    onclick="requestExchange(${skill.id})">

                    🔄 Exchange Skill

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteSkill(${skill.id})">

                    🗑 Delete

                </button>

            </div>

        `;


        skillList.appendChild(card);

    });


    updateStats();

}


// REQUEST EXCHANGE

function requestExchange(id) {

    const skill =
        skills.find(
            skill => skill.id === id
        );


    if (!skill) {

        return;

    }


    const exchange = {

        id: Date.now(),

        skillOwner:
            skill.name,

        teaching:
            skill.teachSkill,

        learning:
            skill.learnSkill,

        status:
            "Pending"

    };


    exchanges.push(exchange);


    saveData();


    alert(
        "Skill exchange request sent! 🔄"
    );


    displayExchanges();

}


// DISPLAY EXCHANGES

function displayExchanges() {

    const exchangeList =
        document.getElementById(
            "exchangeList"
        );


    exchangeList.innerHTML = "";


    if (
        exchanges.length === 0
    ) {

        exchangeList.innerHTML = `

            <div class="empty">

                🔄 No exchange requests yet.

                <br>

                Click "Exchange Skill"
                to send a request.

            </div>

        `;

        return;

    }


    exchanges.forEach(exchange => {


        const card =
            document.createElement("div");


        card.className =
            "exchange-card";


        card.innerHTML = `

            <div>

                <div class="exchange-title">

                    🔄 Skill Exchange with
                    ${exchange.skillOwner}

                </div>


                <div class="exchange-info">

                    💡 Teaching:
                    ${exchange.teaching}

                    &nbsp;&nbsp;

                    📚 Learning:
                    ${exchange.learning}

                </div>

            </div>


            <div>

                <span class="status">

                    ${exchange.status}

                </span>

            </div>

        `;


        exchangeList.appendChild(card);

    });

}


// DELETE SKILL

function deleteSkill(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this skill?"
        );


    if (!confirmDelete) {

        return;

    }


    skills =
        skills.filter(
            skill => skill.id !== id
        );


    saveData();

    displaySkills();

}


// UPDATE STATISTICS

function updateStats() {

    const totalSkills =
        skills.length;


    const uniqueMembers =
        new Set(
            skills.map(
                skill => skill.name
            )
        ).size;


    const totalExchanges =
        exchanges.length;


    const learningSkills =
        skills.filter(
            skill =>
                skill.learnSkill !== ""
        ).length;


    document.getElementById(
        "totalMembers"
    ).textContent =
        uniqueMembers;


    document.getElementById(
        "totalSkills"
    ).textContent =
        totalSkills;


    document.getElementById(
        "exchangeCount"
    ).textContent =
        totalExchanges;


    document.getElementById(
        "learningCount"
    ).textContent =
        learningSkills;

}


// SAVE DATA

function saveData() {

    localStorage.setItem(

        "skillCloudData",

        JSON.stringify(skills)

    );


    localStorage.setItem(

        "skillCloudExchanges",

        JSON.stringify(exchanges)

    );

}


// INITIAL LOAD

displaySkills();

displayExchanges();
