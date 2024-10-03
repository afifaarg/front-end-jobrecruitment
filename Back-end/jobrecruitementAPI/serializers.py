from rest_framework import serializers
from .models import PlatformUser, Skill, Education, Experience, DesiredJob
import uuid
from rest_framework_simplejwt.tokens import RefreshToken

class BlacklistTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh_token']
        return attrs

    def save(self, **kwargs):
        try:
            # Use the refresh token to blacklist it
            token = RefreshToken(self.token)
            token.blacklist()
        except Exception as e:
            self.fail('bad_token')

class PlatformUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = PlatformUser
        fields = ['id','username','unique_id','email', 'password', 'name', 'country', 'city', 'phone', 'description', 'role', 'educations', 'experiences', 'skills']

    def create(self, validated_data):  
        validated_data['unique_id'] = str(uuid.uuid4())[:11]  # Generates a unique ID (first 11 characters of UUID)
        password = validated_data.pop('password')
        user = PlatformUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

    def create(self, validated_data):
        # Create skills and associate them with the user
        print("here skills", validated_data)
        return Skill.objects.create(**validated_data)

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['degree', 'institution', 'field', 'start_date', 'end_date', 'description']

    def create(self, validated_data):
        # Create education and associate it with the user
        education = Education.objects.create(**validated_data)
        return education

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['job_title', 'company', 'location', 'start_date', 'end_date', 'responsibilities']

    def create(self, validated_data):
        # Create experience and associate with the user
        return Experience.objects.create(**validated_data)

class DesiredJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesiredJob
        fields = ['job_title', 'job_location', 'salary_expectation', 'contract_type', 'job_type', 'work_preference', 'description']

    def create(self, validated_data):
        # Create desired job and associate with the user
        return DesiredJob.objects.create(**validated_data)
