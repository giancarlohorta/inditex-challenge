import React from "react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import { LoadingProvider } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPodcasts } from "../../mocks";

const mockAxios = new MockAdapter(axios);

export default {
  title: "Pages/Home",
  component: Home,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <LoadingProvider>
          <Story />
        </LoadingProvider>
      </MemoryRouter>
    ),
  ],
};

export const DefaultState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

  return <Home />;
};

export const LoadingState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/toppodcasts/g).timeout();

  return <Home />;
};

export const ErrorState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/toppodcasts/g).reply(500);

  return <Home />;
};
