import supabase from "../config/supabase.js";

const TryoutModel = {
  async getAllTryouts() {
    const { data, error } = await supabase.from("tryout").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getTryoutById(id) {
    const { data, error } = await supabase
      .from("tryout")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async createTryout(tryoutData) {
    const { data, error } = await supabase
      .from("tryout")
      .insert([tryoutData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateTryout(id, tryoutData) {
    const { data, error } = await supabase
      .from("tryout")
      .update(tryoutData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteTryout(id) {
    const { data, error } = await supabase.from("tryout").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },
};

export default TryoutModel;
