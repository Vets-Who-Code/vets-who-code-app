# Multi-Provider LLM Strategy - Gemini + Azure OpenAI

**For**: Vets Who Code AI Engineering Phase (Weeks 14-17)

---

## 🎯 Why Use Multiple LLM Providers?

### Industry Reality
Most production AI systems use **multiple LLM providers** to:
- **Reduce costs** (use cheaper models for simple tasks)
- **Improve reliability** (fallback if one provider is down)
- **Optimize performance** (use best model for each task)
- **Meet compliance** (use enterprise provider for sensitive data)
- **Avoid vendor lock-in** (flexibility to switch providers)

### VWC Approach: Gemini + Azure OpenAI

We teach students to use **both** so they understand:
- How to abstract provider differences
- When to use each provider
- How to implement fallback logic
- Real-world production patterns

---

## 📊 Provider Comparison

| Feature | Google Gemini | Azure OpenAI |
|---------|---------------|--------------|
| **Best For** | Cost-sensitive, multimodal, high-volume | Enterprise, compliance, Azure ecosystem |
| **Pricing** | ✅ More affordable | Standard OpenAI rates |
| **Speed** | ✅ Fast (optimized for Gemini Pro) | Fast |
| **Multimodal** | ✅ Native (text, image, video, audio) | Image only (GPT-4 Vision) |
| **Context Window** | Up to 1M tokens (Gemini 1.5 Pro) | Up to 128k tokens (GPT-4) |
| **Enterprise Features** | Good | ✅ Excellent (SLAs, compliance) |
| **Compliance** | GDPR, SOC 2 | ✅ HIPAA, SOC 2, ISO 27001 |
| **Integration** | Google Cloud | ✅ Azure ecosystem |
| **Free Tier** | ✅ Yes (limited) | No |
| **Fine-tuning** | Limited | ✅ Yes |

---

## 🗺️ When to Use Each Provider

### Use Gemini For:
✅ **High-volume tasks** (embeddings, classification)
✅ **Multimodal tasks** (image/video analysis)
✅ **Cost-sensitive operations** (summaries, translations)
✅ **Development/testing** (free tier available)
✅ **Long context tasks** (1M token window)

### Use Azure OpenAI For:
✅ **Enterprise deployments** (compliance requirements)
✅ **Sensitive data** (HIPAA, healthcare, finance)
✅ **Azure-integrated apps** (existing Azure infrastructure)
✅ **Fine-tuned models** (custom models for specific domains)
✅ **Production-critical tasks** (SLA guarantees)

---

## 💻 Implementation Patterns

### Pattern 1: Provider Abstraction Layer

```python
from abc import ABC, abstractmethod
import google.generativeai as genai
from openai import AzureOpenAI

class LLMProvider(ABC):
    @abstractmethod
    def generate(self, prompt: str) -> str:
        pass

class GeminiProvider(LLMProvider):
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')

    def generate(self, prompt: str) -> str:
        response = self.model.generate_content(prompt)
        return response.text

class AzureOpenAIProvider(LLMProvider):
    def __init__(self, endpoint: str, api_key: str):
        self.client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=api_key,
            api_version="2024-02-15-preview"
        )

    def generate(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

# Usage
provider = GeminiProvider(api_key=GEMINI_API_KEY)
# OR
provider = AzureOpenAIProvider(endpoint=AZURE_ENDPOINT, api_key=AZURE_KEY)

result = provider.generate("Explain quantum computing")
```

---

### Pattern 2: Smart Router with Fallback

```python
from enum import Enum

class TaskType(Enum):
    EMBEDDING = "embedding"
    SUMMARIZATION = "summarization"
    ANALYSIS = "analysis"
    CHAT = "chat"
    MULTIMODAL = "multimodal"

class LLMRouter:
    def __init__(self):
        self.gemini = GeminiProvider(GEMINI_API_KEY)
        self.azure = AzureOpenAIProvider(AZURE_ENDPOINT, AZURE_KEY)

    def route(self, task_type: TaskType, data_sensitivity: str = "low"):
        """Smart routing based on task and sensitivity"""

        # High sensitivity data always goes to Azure (compliance)
        if data_sensitivity == "high":
            return self.azure

        # Route by task type
        if task_type == TaskType.EMBEDDING:
            return self.gemini  # Cost-effective
        elif task_type == TaskType.MULTIMODAL:
            return self.gemini  # Better multimodal
        elif task_type == TaskType.ANALYSIS:
            return self.azure   # Better quality
        else:
            return self.gemini  # Default to cost-effective

    def generate_with_fallback(self, prompt: str, task_type: TaskType):
        """Try primary provider, fallback to secondary"""
        primary = self.route(task_type)

        try:
            return primary.generate(prompt)
        except Exception as e:
            print(f"Primary provider failed: {e}")
            # Fallback to the other provider
            fallback = self.azure if primary == self.gemini else self.gemini
            return fallback.generate(prompt)

# Usage
router = LLMRouter()
result = router.generate_with_fallback(
    "Summarize this article",
    TaskType.SUMMARIZATION
)
```

---

### Pattern 3: Cost-Optimized Pipeline

```python
class CostOptimizedPipeline:
    def __init__(self):
        self.gemini = GeminiProvider(GEMINI_API_KEY)
        self.azure = AzureOpenAIProvider(AZURE_ENDPOINT, AZURE_KEY)

    async def process_document(self, document: str):
        """Use Gemini for bulk processing, Azure for quality check"""

        # Step 1: Extract key points with Gemini (cheap, fast)
        key_points = self.gemini.generate(
            f"Extract 5 key points from: {document}"
        )

        # Step 2: Create embeddings with Gemini (cost-effective)
        embeddings = await self.create_embeddings_gemini(document)

        # Step 3: Final summary with Azure OpenAI (high quality)
        final_summary = self.azure.generate(
            f"Create executive summary from these points: {key_points}"
        )

        return {
            "key_points": key_points,
            "embeddings": embeddings,
            "summary": final_summary,
            "cost_savings": "60%"  # Estimated vs all Azure
        }
```

---

### Pattern 4: FastAPI Multi-Provider Endpoint

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum

app = FastAPI()

class Provider(str, Enum):
    GEMINI = "gemini"
    AZURE = "azure"
    AUTO = "auto"

class GenerateRequest(BaseModel):
    prompt: str
    provider: Provider = Provider.AUTO
    data_sensitivity: str = "low"

@app.post("/generate")
async def generate(request: GenerateRequest):
    """Multi-provider generation endpoint"""

    router = LLMRouter()

    if request.provider == Provider.GEMINI:
        provider = router.gemini
    elif request.provider == Provider.AZURE:
        provider = router.azure
    else:
        # Auto-select based on sensitivity
        provider = router.route(
            TaskType.CHAT,
            request.data_sensitivity
        )

    try:
        result = provider.generate(request.prompt)
        return {
            "result": result,
            "provider_used": provider.__class__.__name__,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 🔒 Privacy Integration with Presidio

```python
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

class PrivacyAwareLLM:
    def __init__(self):
        self.router = LLMRouter()
        self.analyzer = AnalyzerEngine()
        self.anonymizer = AnonymizerEngine()

    def safe_generate(self, text: str, data_sensitivity: str = "high"):
        """Anonymize PII before sending to LLM"""

        # Step 1: Detect PII
        results = self.analyzer.analyze(
            text=text,
            language='en',
            entities=["PERSON", "EMAIL", "PHONE_NUMBER", "SSN"]
        )

        # Step 2: Anonymize
        anonymized = self.anonymizer.anonymize(
            text=text,
            analyzer_results=results
        )

        # Step 3: Route to appropriate provider
        # High sensitivity → Azure (compliance)
        provider = self.router.route(
            TaskType.ANALYSIS,
            data_sensitivity
        )

        # Step 4: Generate with anonymized text
        result = provider.generate(anonymized.text)

        return {
            "original_had_pii": len(results) > 0,
            "anonymized_text": anonymized.text,
            "result": result,
            "provider_used": provider.__class__.__name__
        }
```

---

## 📈 Week-by-Week Learning Path

### Week 14: Introduction
**Students Learn**:
- Set up both Gemini and Azure OpenAI APIs
- Basic API calls for both
- Compare responses side-by-side
- Understand pricing differences

**Project**: Simple comparison tool that sends same prompt to both providers

---

### Week 15: RAG with Multiple Providers
**Students Learn**:
- Use Gemini for embeddings (cost-effective)
- Use Azure OpenAI for generation (quality)
- LangChain abstraction for both
- Vector database integration

**Project**: RAG chatbot with mixed providers

---

### Week 16: Privacy + Multi-Provider
**Students Learn**:
- Presidio integration for both providers
- Route sensitive data to Azure (compliance)
- Route general data to Gemini (cost)
- Audit logging for both

**Project**: Privacy-aware chatbot with smart routing

---

### Week 17: Production Deployment
**Students Learn**:
- Deploy FastAPI with both providers
- Implement fallback logic
- Cost monitoring and optimization
- Performance metrics for both

**Project**: Production API with health checks, monitoring, failover

---

## 💰 Cost Optimization Examples

### Example 1: Document Processing Pipeline
```
Traditional (all Azure OpenAI):
- 1000 documents
- Embedding: $0.10 per 1M tokens
- Generation: $30 per 1M tokens
- Total: ~$300/month

Optimized (Gemini + Azure):
- Embedding with Gemini: ~$0 (free tier)
- Bulk processing with Gemini: ~$10
- Final QA with Azure: ~$50
- Total: ~$60/month (80% savings)
```

### Example 2: Chatbot
```
Traditional (all Azure):
- 10k conversations/day
- ~$500/month

Optimized (Gemini primary, Azure fallback):
- Gemini for 90% of conversations
- Azure for complex queries only
- Total: ~$150/month (70% savings)
```

---

## 🎓 Student Deliverables

### Week 14 Assignment
Build a comparison dashboard:
- Send same prompt to both providers
- Display responses side-by-side
- Show cost, latency, quality scores
- Let user choose preferred provider

### Week 15 Assignment
Build RAG system with:
- Gemini for document embeddings
- Azure OpenAI for answer generation
- Toggle to switch generation provider
- Compare quality vs cost

### Week 16 Assignment
Privacy-aware AI service:
- Detect PII with Presidio
- Route to Azure if sensitive
- Route to Gemini if general
- Log all decisions for audit

### Final Capstone
Full application with:
- Smart provider routing
- Fallback logic
- Cost monitoring
- Privacy protection
- Production deployment

---

## 📚 Resources for Students

### Official Documentation
- **Gemini**: https://ai.google.dev/docs
- **Azure OpenAI**: https://learn.microsoft.com/azure/ai-services/openai/
- **LangChain**: https://python.langchain.com/docs/integrations/llms/

### Code Examples
- Students get starter templates for each pattern
- Working examples in course repository
- Reference implementations

### Cost Calculators
- Gemini pricing: https://ai.google.dev/pricing
- Azure OpenAI pricing: https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/

---

## ✅ Learning Outcomes

By the end of Phase 3, students can:
- ✅ Integrate both Gemini and Azure OpenAI APIs
- ✅ Build provider abstraction layers
- ✅ Implement smart routing based on task requirements
- ✅ Add fallback logic for reliability
- ✅ Optimize costs by choosing the right provider
- ✅ Protect PII using Presidio before LLM calls
- ✅ Deploy production systems with multiple providers
- ✅ Monitor and compare provider performance

---

**This multi-provider approach gives VWC graduates a competitive advantage** - they understand real-world production AI patterns, not just how to use a single vendor's API.

---

**Version**: 1.0
**Date**: November 6, 2025
**For**: Vets Who Code AI Engineering Curriculum
