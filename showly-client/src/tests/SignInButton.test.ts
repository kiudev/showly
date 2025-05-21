import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { signInWithGoogleAccount } from "@/services/auth";

describe("signInWithGoogleAccount", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let navMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;

    navMock = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should send user token to the API and navigate to home", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          token: "testToken",
        }),
    });

    await signInWithGoogleAccount({ token: "userToken", nav: navMock });

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/users/sign-in/google`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: "userToken" }),
      })
    );

    expect(navMock).toHaveBeenCalledWith("/home");
  });

  test("should handle failed sign in", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "Failed to sign in" }),
    });

    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await signInWithGoogleAccount({ token: "badToken", nav: navMock });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(navMock).not.toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });
});
