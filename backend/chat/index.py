import json
import os
from typing import Dict, Any, List
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработчик запросов к OpenAI GPT для чат-бота
    Args: event - HTTP запрос с сообщениями
          context - контекст выполнения функции
    Returns: Ответ от нейросети
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        messages: List[Dict[str, str]] = body_data.get('messages', [])
        
        if not messages:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Messages are required'}),
                'isBase64Encoded': False
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'OpenAI API key not configured'}),
                'isBase64Encoded': False
            }
        
        openai_request = {
            'model': 'gpt-3.5-turbo',
            'messages': messages,
            'temperature': 0.7,
            'max_tokens': 500
        }
        
        req = urllib.request.Request(
            'https://api.openai.com/v1/chat/completions',
            data=json.dumps(openai_request).encode('utf-8'),
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {api_key}'
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            ai_message = result['choices'][0]['message']['content']
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': ai_message,
                    'model': 'gpt-3.5-turbo'
                }),
                'isBase64Encoded': False
            }
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': f'OpenAI API error: {error_body}'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': f'Server error: {str(e)}'
            }),
            'isBase64Encoded': False
        }
