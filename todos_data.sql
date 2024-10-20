--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.8 (Homebrew)

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

--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todos (id, created_at, title, updated_at, priority) FROM stdin;
1	2024-10-07 11:53:53.489091+00	Jaluta koeraga	\N	3
2	2024-10-07 11:57:11.795465+00	Pese pesu	\N	1
3	2024-10-07 12:26:49.739514+00	Tangi auto	\N	5
\.


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todos_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

