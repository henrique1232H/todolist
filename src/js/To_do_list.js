export class Todo {
  constructor() {

    this.tbody = document.querySelector("table tbody");
    this.load();

    this.task = {
        name: this.name,
        checkbox: false,
        toSelect: this.toSelect,
        fromSelect: this.fromSelect,
    }

  }


  load() {
    this.entries = JSON.parse(localStorage.getItem("@tasks:")) || [];
  }

  save() {
    localStorage.setItem("@tasks:", JSON.stringify(this.entries));
  }

  add(task) {

    this.entries = [task, ...this.entries];
    console.log(this.entries)
    this.update()
  }

  edit() {}

  remove(id) {
    const filtered = this.entries.filter((entries) => entries.name !== id.name);

    console.log(filtered);

    this.entries = filtered;
    this.update();
  }
}


export class List extends Todo {
  constructor() {
    super();

  }

  form() {
    document.querySelector(".addTask").classList.add("hidden");

    const form = document.querySelector("form");
    const checkboxForm = form.querySelector("#oneDay");
    const fromSelect = form.querySelector("#from");

    const button = document.querySelector(".add");

    button.addEventListener("click", () => {
        document.querySelector(".addTask").classList.remove("hidden");
    })

    checkboxForm.onclick = () => {
      this.task.checkbox = !this.task.checkbox;

      if (this.task.checkbox) {
        fromSelect.disabled = true;
        return;
      }

      fromSelect.disabled = false;
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        
        this.task.name = form.querySelector("input").value;
        if(this.task.name === "") {
            alert("digite o nome da tarefa.")
            return;
        }

        this.task.toSelect = form.querySelectorAll("select")[0].value;
        if(this.task.toSelect === "") {
            alert("digite quando começa.")
            return;
        }

        this.task.fromSelect = form.querySelectorAll("select")[1].value;
        if(!this.task.checkbox && this.task.fromSelect === "") {
            alert("digite quando termina.")
            return;
        }


        this.add(this.task);
        

        document.querySelector(".addTask").classList.add("hidden")

    })
  }

  update() {
    this.removeAllTr();

    console.log(this.entries)

    this.entries.forEach((entries) => {
        
      const row = this.createList();
      console.log(entries)
      row.querySelector(".name").textContent = entries.name;
      row.querySelector(
        ".date"
      ).textContent = `${entries.toSelect} até ${entries.fromSelect}`;

      if (entries.fromSelect === "") {
        row.querySelector(".date").textContent = entries.toSelect;
      }

      row.querySelector(".delete").onclick = () => {
        const isOk = confirm("Você quer apagar essa tarefa");

        if (isOk) {
          this.remove(entries);
        }
      };

      this.tbody.append(row);
    });
  }

  createList() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            
            <td class="name">Escovar os dentes</td>
            <td class="date">segunda a segunda</td>
            <td>
                <label for="checkbox" class="sr-only">checkbox</label>
                <input type="checkbox" name="complete">
            </td>
            <td>
                <button class="delete">&times;</button>
            </td>`;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((e) => {
      e.remove();
    });
  }
}
