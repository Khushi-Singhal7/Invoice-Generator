package server.service;

import server.dto.AuthResponse;
import server.dto.ChangePasswordRequest;
import server.dto.LoginRequest;
import server.dto.RegisterRequest;
import server.dto.UpdateProfileRequest;
import server.dto.UserProfileResponse;

public interface UserService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileResponse getProfile();

    UserProfileResponse updateProfile(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);
}