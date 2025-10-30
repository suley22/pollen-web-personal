

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "public";






CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "public";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_change"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  payload json;
begin
  -- Armamos el JSON con los datos del cambio
  payload := json_build_object(
    'table', job,   -- Nombre de la tabla donde pasó el cambio
    'action', TG_OP,          -- INSERT o UPDATE
    'data', row_to_json(NEW)  -- Toda la fila nueva en formato JSON
  );

  -- Enviamos el JSON al webhook de Airtable
  perform (
    select
      content::json
    from
      http_post(
        'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wflO9kqAq03RW6us1/wtrk6sm0MVZJyJaAB',  
        payload::text,
        'application/json'
      )
  );

  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_change"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_insert"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  _url text := 'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wflZEObhk9ppvq0AU/wtrTfk41rFOadcLXD';
begin
  -- Enviamos TODO el row insertado para mapear cómodo en Airtable
  perform net.http_post(
    url := _url,
    headers := jsonb_build_object('Content-Type','application/json'),
    body := to_jsonb(NEW)
  );

  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_insert"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_job_change"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  payload json;
begin
  -- Armamos el JSON con todos los datos del registro nuevo o actualizado
  payload := json_build_object(
    'table', 'job',             -- nombre fijo de la tabla
    'action', TG_OP,            -- tipo de acción (INSERT o UPDATE)
    'data', row_to_json(NEW)    -- todos los campos de la fila
  );

  -- Enviamos el JSON al webhook de Airtable
  perform (
    select content::json
    from http_post(
      'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wflO9kqAq03RW6us1/wtrk6sm0MVZJyJaAB',
      payload::text,
      'application/json'
    )
  );

  -- Devolvemos la nueva fila para que la operación continúe normalmente
  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_job_change"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_job_insert"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  payload json;
begin
  payload := json_build_object(
    'table', 'job',
    'action', 'INSERT',
    'data', row_to_json(NEW)
  );

  perform (
    select content::json
    from http_post(
      'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wflO9kqAq03RW6us1/wtrk6sm0MVZJyJaAB',
      payload::text,
      'application/json'
    )
  );

  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_job_insert"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_job_seeker_insert"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  payload json;
begin
  -- Armamos el JSON con toda la información del nuevo registro
  payload := json_build_object(
    'table', 'job_seeker',    -- nombre fijo de la tabla
    'action', 'INSERT',       -- tipo de acción
    'data', row_to_json(NEW)  -- todas las columnas de la fila nueva
  );

  -- Enviamos el JSON al webhook de Airtable
  perform (
    select content::json
    from http_post(
      'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wfl00lK1ad4Ab3pLn/wtrjAa5xNqNAobCf0',
      payload::text,
      'application/json'
    )
  );

  -- Devolvemos la nueva fila (requerido para que la operación siga normalmente)
  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_job_seeker_insert"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."_notify_airtable_on_job_update"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  payload json;
begin
  payload := json_build_object(
    'table', 'job',
    'action', 'UPDATE',
    'data', row_to_json(NEW)
  );

  perform (
    select content::json
    from http_post(
      'https://hooks.airtable.com/workflows/v1/genericWebhook/appxDfldvZVFD0ceF/wflD1dh2XCiDY3UkP/wtr9YldsjxevAGAsp',
      payload::text,
      'application/json'
    )
  );

  return NEW;
end;
$$;


ALTER FUNCTION "public"."_notify_airtable_on_job_update"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_info"("user_id" "uuid") RETURNS TABLE("id" "uuid", "email" "text", "full_name" "text", "avatar_url" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    COALESCE(
      au.raw_user_meta_data->>'full_name',
      au.raw_user_meta_data->>'first_name',
      au.email
    ) as full_name,
    au.raw_user_meta_data->>'avatar_url' as avatar_url
  FROM auth.users au
  WHERE au.id = user_id;
END;
$$;


ALTER FUNCTION "public"."get_user_info"("user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into public.profile (id, role, email)
  values (new.id, 'job_seeker', new.email); 
  
  -- Actualizar la metadata del usuario en auth.users
  UPDATE auth.users
  SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
    'role', 'job_seeker'
  )
  WHERE id = NEW.id;
   -- 👈 rol por defecto
  return new;
end;$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid" DEFAULT NULL::"uuid", "page_number" integer DEFAULT 1, "page_size" integer DEFAULT 10) RETURNS TABLE("id" "uuid", "first_name" "text", "last_name" "text", "email" "text", "role" "text", "created_at" timestamp with time zone, "updated_at" timestamp with time zone, "avatar_url" "text", "total_count" bigint)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  offset_value INT;
BEGIN
  offset_value := (page_number - 1) * page_size;
  
  RETURN QUERY
  WITH filtered_users AS (
    SELECT 
      p.*,
      COUNT(*) OVER() as total_count
    FROM profile p
    WHERE 
      (excluded_user_id IS NULL OR p.id != excluded_user_id)
      AND (
        search_term IS NULL 
        OR search_term = '' 
        OR (
          -- Búsqueda en campos individuales
          p.first_name ILIKE '%' || search_term || '%'
          OR p.last_name ILIKE '%' || search_term || '%'
          OR p.email ILIKE '%' || search_term || '%'
          -- Búsqueda en concatenación de campos
          OR (COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
          -- Búsqueda invertida (apellido + nombre)
          OR (COALESCE(p.last_name, '') || ' ' || COALESCE(p.first_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
             -- Búsqueda invertida (nombre + apellido)
          OR (COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
        )
      )
    ORDER BY p.created_at DESC
    LIMIT page_size
    OFFSET offset_value
  )
  SELECT 
    fu.id,
    fu.first_name,
    fu.last_name,
    fu.email,
    fu.role,
    fu.created_at,
    fu.updated_at,
    fu.avatar_url,
    fu.total_count
  FROM filtered_users fu;
END;
$$;


ALTER FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid", "page_number" integer, "page_size" integer) OWNER TO "postgres";


COMMENT ON FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid", "page_number" integer, "page_size" integer) IS 'Busca usuarios por nombre, apellido y email con soporte para términos múltiples y concatenación de campos';



CREATE OR REPLACE FUNCTION "public"."update_job_applications_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_job_applications_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."assessments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "internal_pollen_title" "text",
    "title" "text" NOT NULL,
    "subtitle" "text",
    "type" "text" NOT NULL,
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    "estimated_duration" "text",
    "instructions_title" "text",
    "instructions_description" "text",
    "questions" "jsonb" DEFAULT '[]'::"jsonb",
    "categories" "jsonb" DEFAULT '[]'::"jsonb",
    "questions_count" integer DEFAULT 0,
    "total_submissions" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "deleted_at" timestamp with time zone,
    "user_id" "uuid",
    "updated_by" "uuid",
    CONSTRAINT "assessments_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'live'::"text", 'paused'::"text", 'archived'::"text"]))),
    CONSTRAINT "assessments_type_check" CHECK (("type" = ANY (ARRAY['multiple_choice'::"text", 'free_input'::"text", 'file_upload'::"text"])))
);


ALTER TABLE "public"."assessments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."employer_profile" (
    "id" integer NOT NULL,
    "company_name" character varying(200) NOT NULL,
    "company_about" "text",
    "company_size" character varying(50),
    "company_location" character varying(200),
    "website_url" character varying(255),
    "logo_url" character varying(500),
    "work_environment" "text",
    "contact_email" character varying(255),
    "contact_phone" character varying(50),
    "founded_year" character varying(4),
    "approval_status" character varying(20) DEFAULT 'pending'::character varying,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "user_id" "uuid",
    "industries" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "company_loves" "text",
    "company_entry_level" "text",
    "contact_name" "text",
    "job_title" "text",
    "more_info" "text",
    "how_did_you_hear_about_us" "text",
    "hiring_frequency" "text",
    "additional_notes" "text",
    "company_accolades" "text"[],
    "previous_hiring_methods" "text"[],
    "social_medias" "jsonb"[],
    "how_hired_previously" "text"[],
    "deleted_at" "date",
    "updated_by" "uuid" DEFAULT "auth"."uid"()
);


ALTER TABLE "public"."employer_profile" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."employer_profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."employer_profile_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."employer_profile_id_seq" OWNED BY "public"."employer_profile"."id";



CREATE TABLE IF NOT EXISTS "public"."external_jobs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "job_title" character varying(255) NOT NULL,
    "company_name" character varying(255) NOT NULL,
    "industries" "text",
    "location" character varying(255),
    "salary_range" character varying(100),
    "working_hours" character varying(100),
    "employment_type" character varying(100),
    "application_deadline" "date",
    "external_links" "jsonb"[],
    "status" "text" DEFAULT ''::"text",
    "deleted_at" timestamp with time zone,
    "description" "text"
);


ALTER TABLE "public"."external_jobs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."job" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "job_title" character varying(255) NOT NULL,
    "company_name" character varying(255) NOT NULL,
    "status" character varying(50) DEFAULT 'draft'::character varying,
    "assigned_date" "date",
    "location" character varying(255),
    "working_hours" character varying(100),
    "salary_range" character varying(100),
    "work_arrangement" character varying(50),
    "employment_type" character varying(100),
    "employment_type_details" "text",
    "work_authorisation" "text",
    "start_date" character varying(100),
    "application_deadline" "date",
    "description" "text",
    "responsibilities" "text"[],
    "requirements" "text"[],
    "who_would_love" "text"[],
    "success_looks" "text",
    "pollen_approved_requirements" "text"[],
    "internal_notes" "text",
    "review_notes" "text",
    "candidate_counts" "jsonb" DEFAULT '{"new": 0, "hired": 0, "total": 0, "complete": 0, "inProgress": 0}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "need_approval" boolean,
    "benefits" "text"[],
    "required_skills" "text"[],
    "preferred_skills" "text"[],
    "persona_data_id" "text"[],
    "company_id" integer,
    "applicants_id" bigint[],
    "deleted_at" timestamp with time zone,
    "pollen_approved" boolean DEFAULT true,
    "user_id" "uuid",
    CONSTRAINT "job_status_check" CHECK ((("status")::"text" = ANY (ARRAY[('draft'::character varying)::"text", ('live'::character varying)::"text", ('complete'::character varying)::"text", ('paused'::character varying)::"text", ('cancelled'::character varying)::"text"])))
);


ALTER TABLE "public"."job" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."job_applications" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "job_id" "uuid",
    "status" character varying(50) DEFAULT 'new_applicants'::character varying,
    "sub_status" character varying(100) DEFAULT 'Unopened'::character varying,
    "overall_score" numeric(3,1) DEFAULT NULL::numeric,
    "application_stage" character varying(50) DEFAULT 'application_received'::character varying,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "assessment_submitted_at" timestamp with time zone,
    "assessment_data" "jsonb",
    "ai_scores" "jsonb",
    "scores_approved" boolean DEFAULT false,
    "scores_locked" boolean DEFAULT false,
    "last_interaction_date" "date",
    "last_pollen_team_member" character varying(255) DEFAULT NULL::character varying,
    "is_fast_track" boolean DEFAULT false,
    "stopped_at_stage" character varying(50) DEFAULT NULL::character varying,
    "employer_feedback" "jsonb",
    "employer_feedback_status" character varying(50) DEFAULT NULL::character varying,
    "interview_scheduled_at" timestamp with time zone,
    "interview_completed_at" timestamp with time zone,
    "notes" "text",
    "internal_notes" "text",
    "rejection_reason" "text",
    "hired_at" timestamp with time zone,
    "user_id" "uuid" DEFAULT "auth"."uid"(),
    CONSTRAINT "job_applications_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['new_applicants'::character varying, 'in_progress'::character varying, 'matched_to_employer'::character varying, 'complete'::character varying])::"text"[]))),
    CONSTRAINT "job_applications_sub_status_check" CHECK ((("sub_status")::"text" = ANY ((ARRAY['Unopened'::character varying, 'Under Review'::character varying, 'Invited to Pollen Interview'::character varying, 'Pollen Interview Complete'::character varying, 'Awaiting Employer'::character varying, 'Interview Requested'::character varying, 'Interview Booked'::character varying, 'Interview Complete'::character varying, 'Offer Issued'::character varying, 'Hired'::character varying, 'Not Progressing'::character varying])::"text"[])))
);


ALTER TABLE "public"."job_applications" OWNER TO "postgres";


ALTER TABLE "public"."job_applications" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."job_applications_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."job_assessment" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "job_id" "uuid",
    "assessment_type" "text" NOT NULL,
    "estimated_duration" "text",
    "generated_content" "text",
    "structured_questions" "jsonb",
    "scoring_criteria" "text",
    "update_at" timestamp without time zone
);


ALTER TABLE "public"."job_assessment" OWNER TO "postgres";


ALTER TABLE "public"."job_assessment" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."job_assessment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."job_seeker" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "email" "text",
    "location" "text",
    "registration_date" "date",
    "status" "text",
    "profile_complete" boolean,
    "assessment_completed" boolean,
    "overall_skills_score" integer,
    "total_applications" integer,
    "last_activity" timestamp with time zone,
    "key_strengths" "text"[],
    "experience_level" "text",
    "visa_status" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone,
    "profile_picture" "text"
);


ALTER TABLE "public"."job_seeker" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."persona_data" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "job_id" "uuid" NOT NULL,
    "primary_disc" "text",
    "traits" "text"[],
    "work_style" "text",
    "ideal_environment" "text",
    "behavioral_insights" "text"
);


ALTER TABLE "public"."persona_data" OWNER TO "postgres";


ALTER TABLE "public"."persona_data" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."persona_data_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" "uuid" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "username" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "pronouns" "text",
    "role" "text" DEFAULT 'job_seeker'::"text" NOT NULL,
    "email" "text",
    "previus_hired" "text"[]
);


ALTER TABLE "public"."profile" OWNER TO "postgres";


ALTER TABLE ONLY "public"."employer_profile" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."employer_profile_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."assessments"
    ADD CONSTRAINT "assessments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."employer_profile"
    ADD CONSTRAINT "employer_profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."external_jobs"
    ADD CONSTRAINT "external_jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job_assessment"
    ADD CONSTRAINT "job_assessment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job"
    ADD CONSTRAINT "job_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job_seeker"
    ADD CONSTRAINT "job_seeker_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."persona_data"
    ADD CONSTRAINT "persona_data_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_username_key" UNIQUE ("username");



CREATE INDEX "idx_external_jobs_application_deadline" ON "public"."external_jobs" USING "btree" ("application_deadline");



CREATE INDEX "idx_external_jobs_company_name" ON "public"."external_jobs" USING "btree" ("company_name");



CREATE INDEX "idx_external_jobs_location" ON "public"."external_jobs" USING "btree" ("location");



CREATE INDEX "idx_job_application_deadline" ON "public"."job" USING "btree" ("application_deadline");



CREATE INDEX "idx_job_applications_application_stage" ON "public"."job_applications" USING "btree" ("application_stage");



CREATE INDEX "idx_job_applications_last_interaction" ON "public"."job_applications" USING "btree" ("last_interaction_date");



CREATE INDEX "idx_job_applications_status" ON "public"."job_applications" USING "btree" ("status");



CREATE INDEX "idx_job_applications_sub_status" ON "public"."job_applications" USING "btree" ("sub_status");



CREATE INDEX "idx_job_applications_updated_at" ON "public"."job_applications" USING "btree" ("updated_at");



CREATE INDEX "idx_job_assigned_date" ON "public"."job" USING "btree" ("assigned_date");



CREATE INDEX "idx_job_candidate_counts" ON "public"."job" USING "gin" ("candidate_counts");



CREATE INDEX "idx_job_company_name" ON "public"."job" USING "btree" ("company_name");



CREATE INDEX "idx_job_requirements" ON "public"."job" USING "gin" ("requirements");



CREATE INDEX "idx_job_responsibilities" ON "public"."job" USING "gin" ("responsibilities");



CREATE INDEX "idx_job_status" ON "public"."job" USING "btree" ("status");



CREATE OR REPLACE TRIGGER "trg_airtable_notify_job" AFTER INSERT OR UPDATE ON "public"."job" FOR EACH ROW EXECUTE FUNCTION "public"."_notify_airtable_on_job_change"();



CREATE OR REPLACE TRIGGER "trg_airtable_notify_job_insert" AFTER INSERT ON "public"."job" FOR EACH ROW EXECUTE FUNCTION "public"."_notify_airtable_on_job_insert"();



CREATE OR REPLACE TRIGGER "trg_airtable_notify_job_update" AFTER UPDATE ON "public"."job" FOR EACH ROW EXECUTE FUNCTION "public"."_notify_airtable_on_job_update"();



CREATE OR REPLACE TRIGGER "trg_profile_airtable" AFTER INSERT ON "public"."profile" FOR EACH ROW EXECUTE FUNCTION "public"."_notify_airtable_on_insert"();



CREATE OR REPLACE TRIGGER "trigger_update_job_applications_updated_at" BEFORE UPDATE ON "public"."job_applications" FOR EACH ROW EXECUTE FUNCTION "public"."update_job_applications_updated_at"();



ALTER TABLE ONLY "public"."assessments"
    ADD CONSTRAINT "assessments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."assessments"
    ADD CONSTRAINT "assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."employer_profile"
    ADD CONSTRAINT "employer_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id");



ALTER TABLE ONLY "public"."job_assessment"
    ADD CONSTRAINT "job_assessment_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."job"
    ADD CONSTRAINT "job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."employer_profile"("id");



ALTER TABLE ONLY "public"."persona_data"
    ADD CONSTRAINT "persona_data_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."job"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow admin users to read job applications" ON "public"."job_applications" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "auth"."users"
  WHERE (("users"."id" = "auth"."uid"()) AND (("users"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text")))));



CREATE POLICY "Allow admin users to read jobs" ON "public"."job" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "auth"."users"
  WHERE (("users"."id" = "auth"."uid"()) AND (("users"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text")))));



CREATE POLICY "Allow admin users to update job applications" ON "public"."job_applications" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "auth"."users"
  WHERE (("users"."id" = "auth"."uid"()) AND (("users"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "auth"."users"
  WHERE (("users"."id" = "auth"."uid"()) AND (("users"."raw_user_meta_data" ->> 'role'::"text") = 'admin'::"text")))));



CREATE POLICY "Allow authenticated users to read job applications" ON "public"."job_applications" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to read jobs" ON "public"."job" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Anyone can view profiles" ON "public"."employer_profile" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Roles can S-I-U-D" ON "public"."job_assessment" TO "authenticated" USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "Roles can update" ON "public"."profile" FOR UPDATE USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "User roles can S-I-U-D" ON "public"."job" TO "authenticated" USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "User roles can S-I-U-D" ON "public"."persona_data" USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "Users can delete their own profile" ON "public"."employer_profile" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own profile" ON "public"."profile" FOR DELETE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can insert their own profile" ON "public"."employer_profile" FOR INSERT WITH CHECK (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "Users can insert their own profile" ON "public"."profile" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own profile" ON "public"."employer_profile" FOR UPDATE USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



CREATE POLICY "Users can view their own profile" ON "public"."profile" FOR SELECT USING (((("auth"."jwt"() -> 'user_metadata'::"text") ->> 'role'::"text") = ANY (ARRAY['admin'::"text", 'job_seeker'::"text"])));



ALTER TABLE "public"."employer_profile" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."job" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."job_assessment" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."persona_data" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."job_assessment";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































































































































GRANT ALL ON FUNCTION "public"."_notify_airtable_on_change"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_change"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_change"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_notify_airtable_on_insert"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_insert"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_insert"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_change"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_change"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_change"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_insert"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_insert"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_insert"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_seeker_insert"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_seeker_insert"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_seeker_insert"() TO "service_role";



GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_update"() TO "anon";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_update"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."_notify_airtable_on_job_update"() TO "service_role";



GRANT ALL ON FUNCTION "public"."bytea_to_text"("data" "bytea") TO "postgres";
GRANT ALL ON FUNCTION "public"."bytea_to_text"("data" "bytea") TO "anon";
GRANT ALL ON FUNCTION "public"."bytea_to_text"("data" "bytea") TO "authenticated";
GRANT ALL ON FUNCTION "public"."bytea_to_text"("data" "bytea") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_info"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_info"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_info"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."http"("request" "public"."http_request") TO "postgres";
GRANT ALL ON FUNCTION "public"."http"("request" "public"."http_request") TO "anon";
GRANT ALL ON FUNCTION "public"."http"("request" "public"."http_request") TO "authenticated";
GRANT ALL ON FUNCTION "public"."http"("request" "public"."http_request") TO "service_role";



GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying, "content" character varying, "content_type" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying, "content" character varying, "content_type" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying, "content" character varying, "content_type" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_delete"("uri" character varying, "content" character varying, "content_type" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying, "data" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying, "data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying, "data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_get"("uri" character varying, "data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."http_head"("uri" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_head"("uri" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_head"("uri" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_head"("uri" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_header"("field" character varying, "value" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_header"("field" character varying, "value" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_header"("field" character varying, "value" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_header"("field" character varying, "value" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_list_curlopt"() TO "postgres";
GRANT ALL ON FUNCTION "public"."http_list_curlopt"() TO "anon";
GRANT ALL ON FUNCTION "public"."http_list_curlopt"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_list_curlopt"() TO "service_role";



GRANT ALL ON FUNCTION "public"."http_patch"("uri" character varying, "content" character varying, "content_type" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_patch"("uri" character varying, "content" character varying, "content_type" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_patch"("uri" character varying, "content" character varying, "content_type" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_patch"("uri" character varying, "content" character varying, "content_type" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "data" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "content" character varying, "content_type" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "content" character varying, "content_type" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "content" character varying, "content_type" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_post"("uri" character varying, "content" character varying, "content_type" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_put"("uri" character varying, "content" character varying, "content_type" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_put"("uri" character varying, "content" character varying, "content_type" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_put"("uri" character varying, "content" character varying, "content_type" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_put"("uri" character varying, "content" character varying, "content_type" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."http_reset_curlopt"() TO "postgres";
GRANT ALL ON FUNCTION "public"."http_reset_curlopt"() TO "anon";
GRANT ALL ON FUNCTION "public"."http_reset_curlopt"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_reset_curlopt"() TO "service_role";



GRANT ALL ON FUNCTION "public"."http_set_curlopt"("curlopt" character varying, "value" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."http_set_curlopt"("curlopt" character varying, "value" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."http_set_curlopt"("curlopt" character varying, "value" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."http_set_curlopt"("curlopt" character varying, "value" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid", "page_number" integer, "page_size" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid", "page_number" integer, "page_size" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_users"("search_term" "text", "excluded_user_id" "uuid", "page_number" integer, "page_size" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."text_to_bytea"("data" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."text_to_bytea"("data" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."text_to_bytea"("data" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."text_to_bytea"("data" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_job_applications_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_job_applications_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_job_applications_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."urlencode"("string" "bytea") TO "postgres";
GRANT ALL ON FUNCTION "public"."urlencode"("string" "bytea") TO "anon";
GRANT ALL ON FUNCTION "public"."urlencode"("string" "bytea") TO "authenticated";
GRANT ALL ON FUNCTION "public"."urlencode"("string" "bytea") TO "service_role";



GRANT ALL ON FUNCTION "public"."urlencode"("data" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."urlencode"("data" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."urlencode"("data" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."urlencode"("data" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."urlencode"("string" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."urlencode"("string" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."urlencode"("string" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."urlencode"("string" character varying) TO "service_role";





















GRANT ALL ON TABLE "public"."assessments" TO "anon";
GRANT ALL ON TABLE "public"."assessments" TO "authenticated";
GRANT ALL ON TABLE "public"."assessments" TO "service_role";



GRANT ALL ON TABLE "public"."employer_profile" TO "anon";
GRANT ALL ON TABLE "public"."employer_profile" TO "authenticated";
GRANT ALL ON TABLE "public"."employer_profile" TO "service_role";



GRANT ALL ON SEQUENCE "public"."employer_profile_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."employer_profile_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."employer_profile_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."external_jobs" TO "anon";
GRANT ALL ON TABLE "public"."external_jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."external_jobs" TO "service_role";



GRANT ALL ON TABLE "public"."job" TO "anon";
GRANT ALL ON TABLE "public"."job" TO "authenticated";
GRANT ALL ON TABLE "public"."job" TO "service_role";



GRANT ALL ON TABLE "public"."job_applications" TO "anon";
GRANT ALL ON TABLE "public"."job_applications" TO "authenticated";
GRANT ALL ON TABLE "public"."job_applications" TO "service_role";



GRANT ALL ON SEQUENCE "public"."job_applications_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."job_applications_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."job_applications_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."job_assessment" TO "anon";
GRANT ALL ON TABLE "public"."job_assessment" TO "authenticated";
GRANT ALL ON TABLE "public"."job_assessment" TO "service_role";



GRANT ALL ON SEQUENCE "public"."job_assessment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."job_assessment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."job_assessment_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."job_seeker" TO "anon";
GRANT ALL ON TABLE "public"."job_seeker" TO "authenticated";
GRANT ALL ON TABLE "public"."job_seeker" TO "service_role";



GRANT ALL ON TABLE "public"."persona_data" TO "anon";
GRANT ALL ON TABLE "public"."persona_data" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_data" TO "service_role";



GRANT ALL ON SEQUENCE "public"."persona_data_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."persona_data_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."persona_data_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























drop extension if exists "pg_net";

create extension if not exists "pg_net" with schema "public";

alter table "public"."job_applications" drop constraint "job_applications_status_check";

alter table "public"."job_applications" drop constraint "job_applications_sub_status_check";

alter table "public"."job_applications" add constraint "job_applications_status_check" CHECK (((status)::text = ANY ((ARRAY['new_applicants'::character varying, 'in_progress'::character varying, 'matched_to_employer'::character varying, 'complete'::character varying])::text[]))) not valid;

alter table "public"."job_applications" validate constraint "job_applications_status_check";

alter table "public"."job_applications" add constraint "job_applications_sub_status_check" CHECK (((sub_status)::text = ANY ((ARRAY['Unopened'::character varying, 'Under Review'::character varying, 'Invited to Pollen Interview'::character varying, 'Pollen Interview Complete'::character varying, 'Awaiting Employer'::character varying, 'Interview Requested'::character varying, 'Interview Booked'::character varying, 'Interview Complete'::character varying, 'Offer Issued'::character varying, 'Hired'::character varying, 'Not Progressing'::character varying])::text[]))) not valid;

alter table "public"."job_applications" validate constraint "job_applications_sub_status_check";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "auth users pueden subir-leer-actualizar imagenes  1ffg0oo_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'images'::text));



  create policy "auth users pueden subir-leer-actualizar imagenes  1ffg0oo_1"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'images'::text));



  create policy "auth users pueden subir-leer-actualizar imagenes  1ffg0oo_2"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'images'::text));



