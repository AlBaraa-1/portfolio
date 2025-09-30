import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProjectView {
  id?: string;
  project_id: string;
  viewed_at?: string;
  user_agent?: string;
  ip_hash?: string;
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'new' | 'read' | 'responded';
  submitted_at?: string;
  created_at?: string;
}

export interface GitHubActivityCache {
  id?: string;
  username: string;
  activity_data: any;
  cached_at?: string;
  expires_at?: string;
}

export const trackProjectView = async (projectId: string) => {
  try {
    const { error } = await supabase
      .from('project_views')
      .insert({
        project_id: projectId,
        user_agent: navigator.userAgent,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking project view:', error);
  }
};

export const getProjectViewCount = async (projectId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('project_views')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting project view count:', error);
    return 0;
  }
};

export const getAllProjectViews = async (): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabase
      .from('project_views')
      .select('project_id');

    if (error) throw error;

    const viewCounts: Record<string, number> = {};
    data?.forEach((view) => {
      viewCounts[view.project_id] = (viewCounts[view.project_id] || 0) + 1;
    });

    return viewCounts;
  } catch (error) {
    console.error('Error getting all project views:', error);
    return {};
  }
};

export const submitContactForm = async (submission: ContactSubmission) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
};
