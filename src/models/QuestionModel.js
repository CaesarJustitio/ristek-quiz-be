import supabase from "../config/supabase.js";

const QuestionModel = {
  getQuestionsByTryoutId: async (tryout_id) => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("tryout_id", tryout_id);

    if (error) throw new Error(error.message);
    return data;
  },

  getQuestionById: async (id) => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  createQuestion: async (question) => {
    const { data, error } = await supabase
      .from("questions")
      .insert([question])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  updateQuestion: async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("questions")
      .update(updatedFields)
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  deleteQuestion: async (id) => {
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};

export default QuestionModel;
