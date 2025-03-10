import supabase from "../config/supabase.js";

const SubmissionModel = {
  async getSubmissions() {
    const { data, error } = await supabase.from("submission").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async createSubmission(submissionData) {
    const { data, error } = await supabase
      .from("submission")
      .insert([submissionData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  getSubmissionsByTryoutId: async (tryout_id) => {
    const { data, error } = await supabase
      .from("submission")
      .select("*")
      .eq("tryout_id", tryout_id);

    if (error) throw new Error(error.message);
    return data;
  },
};

export default SubmissionModel;
