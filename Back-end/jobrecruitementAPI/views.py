from tokenize import TokenError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken  # Optional, for JWT
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import PlatformUser, DesiredJob
from .serializers import PlatformUserSerializer, BlacklistTokenSerializer, SkillSerializer, EducationSerializer, ExperienceSerializer, DesiredJobSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.views import TokenBlacklistView
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from rest_framework.exceptions import ValidationError

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh_token")  # Get refresh token from the request body
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class PlatformUserViewSet(viewsets.ModelViewSet):
    queryset = PlatformUser.objects.all()
    serializer_class = PlatformUserSerializer

    @transaction.atomic  # Ensure that all saves are part of the same transaction
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True) 
        # Ensure required fields are present
        if not all([
            'username' in request.data,
            'password' in request.data,
            'name' in request.data,
        ]):
            return Response({'error': 'Missing required fields: username, password, name'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the main user profile
        user = serializer.save()
        # Handle related models: skills, education, experience, and desired job
        if 'skills' in request.data:
            print("skills")
            # Convert the list of skill strings to a list of dictionaries with the 'name' key
            skills_data = [{'name': skill} for skill in request.data['skills']]
            skills_serializer = SkillSerializer(data=skills_data, many=True)
            if skills_serializer.is_valid(raise_exception=True):
                skills_serializer.save(user=user)  # Save related skills

        if 'educations' in request.data:
            educations_serializer = EducationSerializer(data=request.data['educations'], many=True)
            if educations_serializer.is_valid(raise_exception=True):
                educations_serializer.save(user=user)  # Save related educations

        if 'experiences' in request.data:
            experiences_serializer = ExperienceSerializer(data=request.data['experiences'], many=True)
            if experiences_serializer.is_valid(raise_exception=True):
                experiences_serializer.save(user=user)  # Save related experiences

        if 'desired_job' in request.data:
            desired_job_serializer = DesiredJobSerializer(data=request.data['desired_job'])
            if desired_job_serializer.is_valid(raise_exception=True):
                desired_job_serializer.save(user=user)  # Save related desired job

        # Generate JWT tokens for the user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": PlatformUserSerializer(user).data,
            "refresh_token": str(refresh),
            "access_token": str(refresh.access_token),
            "message": "User registered successfully"
        }, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if not user:
            print("wrong credentials")
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Optional: Generate JWT Token
        refresh = RefreshToken.for_user(user)

        # Fetch user information
        loginInfomations = user
        yourInfo = PlatformUser.objects.get(username=username)  # Ensure user is an instance of PlatformUser
        skills = list(yourInfo.skills.values_list('name', flat=True))
        educations = list(yourInfo.educations.values())
        experiences = list(yourInfo.experiences.values())
        desiredJob = DesiredJob.objects.first()  # Assuming one desired job per user

        # Prepare response data
        response_data = {
            'username': loginInfomations.username,
            'password': loginInfomations.password,  # Consider security implications of returning password
            'name': yourInfo.name,
            'experienceYears': yourInfo.total_years_of_experience,
            'uniqueID': yourInfo.unique_id,
            'email': yourInfo.email,  # Ensure you have this field in your PlatformUser model
            'phone': yourInfo.phone,
            'country': yourInfo.country,
            'city': yourInfo.city,
            'description': yourInfo.description, 
            'skills': skills,
            'educations': [{
                'degree': education['degree'],
                'field': education['field'],
                'institution': education['institution'],
                'start_date': education['start_date'],
                'end_date': education['end_date'],
                'description': education['description'],
            } for education in educations],
            'experiences': [{
                'job_title': experience['job_title'],
                'company': experience['company'],
                'location': experience['location'],
                'start_date': experience['start_date'],
                'end_date': experience['end_date'],
                'responsibilities': experience['responsibilities'],
            } for experience in experiences],
            'desiredJob': {
                'job_title': desiredJob.job_title if desiredJob else None,
                'job_location': desiredJob.job_location if desiredJob else None,
                'salary_expectation': desiredJob.salary_expectation if desiredJob else None,
                'contract_type': desiredJob.contract_type if desiredJob else None,
                'job_type': desiredJob.job_type if desiredJob else None,
                'work_preference': desiredJob.work_preference if desiredJob else None,
                'description': desiredJob.description if desiredJob else None,
            } if desiredJob else ''
        }

        return Response({
            'message': 'Login successful!',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_data': response_data
        }, status=status.HTTP_200_OK)