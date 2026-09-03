import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  User,
  LogIn,
  GraduationCap,
} from 'lucide-react';

export default function WaliLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    // =========================
    // VALIDASI
    // =========================
    if (!username.trim()) {
      setError('Username / NISN wajib diisi.');
      return;
    }

    if (!password.trim()) {
      setError('Password wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      // =========================
      // CALL API LOGIN
      // =========================
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          clientType: 2,
        }),
      });

      // =========================
      // BACA RESPONSE
      // =========================
      let result = null;

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error('Response bukan JSON:', jsonError);
      }

      console.log('Login API Response:', result);

      // =========================
      // HTTP ERROR
      // =========================
      if (!response.ok) {
        const errorMessage =
          result?.message ||
          result?.Message ||
          result?.title ||
          result?.Title ||
          'Username atau password salah.';

        setError(errorMessage);
        return;
      }

      // =========================
      // CEK STATUS SUCCESS API
      // =========================
      if (
        result?.success === false ||
        result?.Success === false
      ) {
        const errorMessage =
          result?.message ||
          result?.Message ||
          'Login gagal.';

        setError(errorMessage);
        return;
      }

      // =========================
      // AMBIL DATA LOGIN
      // =========================
      const loginData =
        result?.data ??
        result?.Data ??
        null;

      console.log('Login Data:', loginData);

      // =========================
      // SIMPAN RESPONSE LOGIN
      // =========================
      localStorage.setItem(
        'loginResponse',
        JSON.stringify(result)
      );

      // =========================
      // SIMPAN DATA USER
      // =========================
      if (loginData) {
        localStorage.setItem(
          'user',
          JSON.stringify(loginData)
        );
      }

      // =========================
      // STATUS LOGIN
      // =========================
      localStorage.setItem(
        'isAuthenticated',
        'true'
      );

      localStorage.setItem(
        'userRole',
        'wali'
      );

      // =========================
      // AMBIL TOKEN
      // =========================
      const token =
        loginData?.token ??
        loginData?.Token ??
        loginData?.accessToken ??
        loginData?.AccessToken ??
        result?.token ??
        result?.Token ??
        result?.accessToken ??
        result?.AccessToken;

      if (token) {
        localStorage.setItem(
          'token',
          token
        );
      }

      // =========================
      // LOGIN BERHASIL
      // =========================
      navigate('/wali', {
        replace: true,
      });

    } catch (err) {
      console.error('Login Error:', err);

      setError(
        'Tidak dapat terhubung ke server. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* =========================
            LOGO / HEADER
        ========================= */}
        <div className="text-center mb-6">

          <div
            className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-blue-600
              flex
              items-center
              justify-center
              shadow-sm
              mb-4
            "
          >
            <GraduationCap
              size={34}
              className="text-white"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Sistem Informasi Siswa
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            SMAN 1 Kota Mungkid
          </p>
        </div>

        {/* =========================
            LOGIN CARD
        ========================= */}
        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            border
            border-gray-100
          "
        >

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Selamat Datang 👋
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Silakan masuk untuk melanjutkan
            </p>
          </div>

          {/* =========================
              ERROR
          ========================= */}
          {error && (
            <div
              className="
                mb-4
                rounded-xl
                bg-red-50
                border
                border-red-100
                px-4
                py-3
              "
            >
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* =========================
              FORM LOGIN
          ========================= */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* =========================
                USERNAME
            ========================= */}
            <div>
              <label
                htmlFor="username"
                className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-1.5
                "
              >
                Username / NISN
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Masukkan username atau NISN"
                  autoComplete="username"
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    pl-10
                    pr-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                />

              </div>
            </div>

            {/* =========================
                PASSWORD
            ========================= */}
            <div>
              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-1.5
                "
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    w-full
                    h-12
                    pl-10
                    pr-11
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  disabled={loading}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-600
                    transition
                    disabled:cursor-not-allowed
                  "
                  aria-label={
                    showPassword
                      ? 'Sembunyikan password'
                      : 'Tampilkan password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>
            </div>

            {/* =========================
                LUPA PASSWORD
            ========================= */}
            <div className="flex justify-end">

              <button
                type="button"
                disabled={loading}
                className="
                  text-xs
                  font-medium
                  text-blue-600
                  hover:text-blue-700
                  transition
                  disabled:opacity-50
                "
                onClick={() => {
                  // TODO:
                  // Implementasi lupa password
                }}
              >
                Lupa password?
              </button>

            </div>

            {/* =========================
                LOGIN BUTTON
            ========================= */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-800
                text-white
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition
                shadow-sm
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              {loading ? (
                <>
                  <div
                    className="
                      w-5
                      h-5
                      border-2
                      border-white
                      border-t-transparent
                      rounded-full
                      animate-spin
                    "
                  />

                  <span>
                    Memproses...
                  </span>
                </>
              ) : (
                <>
                  <LogIn size={19} />

                  <span>
                    Masuk
                  </span>
                </>
              )}

            </button>

          </form>

          {/* =========================
              INFO LOGIN
          ========================= */}
          <div
            className="
              mt-5
              rounded-xl
              bg-blue-50
              border
              border-blue-100
              p-3
            "
          >
            <p className="
              text-xs
              font-semibold
              text-blue-700
            ">
              Akses Wali Murid
            </p>

            <p className="
              text-xs
              text-blue-600
              mt-1
            ">
              Gunakan username dan password
              yang telah diberikan sekolah.
            </p>
          </div>

        </div>

        {/* =========================
            FOOTER
        ========================= */}
        <div className="text-center mt-5">

          <p className="text-xs text-gray-400">
            © 2026 SMAN 1 Kota Mungkid
          </p>

          <p className="text-[10px] text-gray-400 mt-1">
            Sistem Informasi Siswa
          </p>

        </div>

      </div>
    </div>
  );
}
