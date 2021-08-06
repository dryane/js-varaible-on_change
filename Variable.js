class Variable {
  #vars = { a: 1 };
  constructor(v = this.#vars) {
    v = Object.assign(v, this.#vars)
    for (const [key, value] of Object.entries(v)) {
      this.#vars[key] = value;
      this.#get_set(key);
    }
  }
  
  #get_set(k) {
    Object.defineProperty(this, k, {
      get() { return this.#vars[k]; },
      set(v) {
        this.#vars[k] = v;
        this.#on_change_function(this.#vars[k], k);
      }
    });
  }
  
  get_variable_by_name(n) {
    return this.#vars[n];
  }
  
  #this_onchange_action;
  on_change (f) {
    this.#this_onchange_action = f;
  }
  #on_change_function(v, n) {
    if (typeof this.#this_onchange_action == "function")
      this.#this_onchange_action(v, n, this);
  }
}

console.clear();

x = new Variable({b:11});
console.log(x.a);
console.log(x.b);

x.on_change( (v, n, e) => {
  console.log(`Value: ${v}`);
  console.log(`Name: ${n}`);
  console.log(e);
});

x.a = 36;
