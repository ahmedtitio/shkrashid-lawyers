import fs from 'fs';
import path from 'path';

const ADMIN_CONFIG_FILE = path.join(process.cwd(), 'data', 'admin-config.json');
const ADMIN_DATA_FILE = path.join(process.cwd(), 'data', 'admin.json'); // Keep for backward compatibility

export function validateAdminCredentials(username: string, password: string): boolean {
  console.log('validateAdminCredentials called with:', username);

  try {
    // Try to read from new config file first
    if (fs.existsSync(ADMIN_CONFIG_FILE)) {
      const configData = fs.readFileSync(ADMIN_CONFIG_FILE, 'utf-8');
      const config = JSON.parse(configData);

      // Check if account is locked
      if (config.admin.is_locked) {
        console.log('Account is locked');
        return false;
      }

      // Check if max login attempts exceeded
      if (config.admin.login_attempts >= config.security.max_login_attempts) {
        console.log('Max login attempts exceeded');
        return false;
      }

      console.log('Stored username:', config.admin.username);
      console.log('Password match:', config.admin.password === password);

      const isValid = config.admin.username === username && config.admin.password === password;

      if (isValid) {
        // Reset login attempts on successful login
        config.admin.login_attempts = 0;
        config.admin.last_login = new Date().toISOString();
        fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2));
        console.log('Login successful, updated login info');
      } else {
        // Increment login attempts on failed login
        config.admin.login_attempts += 1;
        fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2));
        console.log('Login failed, incremented attempts to:', config.admin.login_attempts);
      }

      return isValid;
    }

    // Fallback to old admin.json file
    if (fs.existsSync(ADMIN_DATA_FILE)) {
      const data = fs.readFileSync(ADMIN_DATA_FILE, 'utf-8');
      const adminData = JSON.parse(data);

      console.log('Using fallback admin.json');
      console.log('Stored password:', adminData.password);

      return adminData.password === password;
    }

    console.log('No admin configuration file found');
    return false;
  } catch (error) {
    console.error('Error validating admin credentials:', error);
    return false;
  }
}

export function updateAdminPassword(newPassword: string): boolean {
  try {
    if (!fs.existsSync(ADMIN_CONFIG_FILE)) {
      console.log('Admin config file not found');
      return false;
    }

    const configData = fs.readFileSync(ADMIN_CONFIG_FILE, 'utf-8');
    const config = JSON.parse(configData);

    config.admin.password = newPassword;
    config.admin.password_changed_at = new Date().toISOString();

    fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('Password updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating admin password:', error);
    return false;
  }
}

export function getAdminConfig() {
  try {
    if (fs.existsSync(ADMIN_CONFIG_FILE)) {
      const configData = fs.readFileSync(ADMIN_CONFIG_FILE, 'utf-8');
      return JSON.parse(configData);
    }
    return null;
  } catch (error) {
    console.error('Error reading admin config:', error);
    return null;
  }
}

export function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const config = getAdminConfig();

  if (!config) {
    return { isValid: true, errors: [] }; // No validation if config not found
  }

  if (password.length < config.security.password_min_length) {
    errors.push(`كلمة المرور يجب أن تكون ${config.security.password_min_length} أحرف على الأقل`);
  }

  if (config.security.require_numbers && !/\d/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
  }

  if (config.security.require_special_chars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
